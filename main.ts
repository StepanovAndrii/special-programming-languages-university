enum StudentStatus {
    Active = "Активний", // Тепер студент активний
    Academic_Leave = "Академічна відпустка", // Студент в академічній відпустці
    Graduated = "Випускник", // Студент закінчив навчання
    Expelled = "Виключений", // Студент виключений з університету
}

enum CourseType {
    Mandatory = "Обов'язковий", // Курс обов'язковий для проходження
    Optional = "Необов'язковий", // Курс необов'язковий
    Special = "Спеціальний", // Спеціальний курс, як щось особливе
}

enum Semester {
    First = "Перший", // Перший семестр
    Second = "Другий", // Другий семестр
}

enum Grade {
    Excellent = 5, // Відмінно
    Good = 4, // Добре
    Satisfactory = 3, // Задовільно
    Unsatisfactory = 2, // Не задовільно
}

enum Faculty {
    Computer_Science = "Комп'ютерні науки", // Кафедра комп'ютерних наук
    Economics = "Економіка", // Кафедра економіки
    Law = "Право", // Кафедра права
    Engineering = "Інженерія", // Кафедра інженерії
}

interface Student {
    id: number; // Ідентифікаційний номер студента
    fullName: string; // Повне ім'я студента
    faculty: Faculty; // Який факультет студент
    year: number; // Який рік навчання
    status: StudentStatus; // Статус студента
    enrollmentDate: Date; // Дата зарахування
    groupNumber: string; // Номер групи
}

interface Course {
    id: number; // Ідентифікаційний номер курсу
    name: string; // Назва курсу
    type: CourseType; // Тип курсу (обов'язковий, не обов'язковий, спеціальний)
    credits: number; // Кредити, скільки балів дається за курс
    semester: Semester; // В якому семестрі цей курс
    faculty: Faculty; // До якого факультету належить курс
    maxStudents: number; // Максимальна кількість студентів на курсі
}

interface GradeRecord {
    studentId: number; // Ідентифікаційний номер студента
    courseId: number; // Ідентифікаційний номер курсу
    grade: Grade; // Оцінка
    date: Date; // Дата виставлення оцінки
    semester: Semester; // Семестр, в якому була виставлена оцінка
}

interface Registration {
    studentId: number;
    courseId: number;
}

class UniversityManagementSystem {
    private students: Student[] = []; // Тут зберігаємо студентів
    private courses: Course[] = [];   // Тут зберігаємо курси
    private grades: GradeRecord[] = []; // Тут оцінки студентів
    private registrations: Registration[] = []; // Тут зберігаємо реєстрації студентів на курси

    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = {
            ...student,
            id: this.students.length + 1, // Присвоюємо ID студенту
        };
        this.students.push(newStudent); // Додаємо студента в список
        return newStudent; // Повертаємо нового студента
    }

    addCourse(course: Course): void {
        this.courses.push(course); // Додаємо курс до системи
    }

    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.filter(s => s.id === studentId)[0]; // Використовуємо filter, щоб отримати перший елемент
        const course = this.courses.filter(c => c.id === courseId)[0]; // Теж filter для курсу

        if (!student || !course) { 
            throw new Error("Студента або курсу не знайдено."); // Якщо студента чи курс не знайшли
        }

        if (student.faculty !== course.faculty) { // Перевіряємо, чи студент і курс з одного факультету
            throw new Error("Студент і курс повинні належати до одного факультету.");
        }

        const enrolledStudents = this.registrations.filter(r => r.courseId === courseId).map(r => r.studentId); // Перевіряємо, скільки студентів вже записано на курс
        if (enrolledStudents.length >= course.maxStudents) { // Якщо місць вже немає
            throw new Error("Курс вже заповнений.");
        }

        this.registrations.push({ studentId, courseId }); // Реєструємо студента на курс
    }

    setGrade(studentId: number, courseId: number, grade: Grade): void {
        let registration: Registration | undefined;
        for (let i = 0; i < this.registrations.length; i++) { // Використовуємо цикл для пошуку реєстрації
            if (this.registrations[i].studentId === studentId && this.registrations[i].courseId === courseId) {
                registration = this.registrations[i];
                break; // Виходимо з циклу, як тільки знайшли
            }
        }

        if (!registration) {
            throw new Error("Студент не зареєстрований на цей курс."); // Якщо студент не записаний на курс
        }

        const gradeRecord: GradeRecord = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: this.courses.filter(c => c.id === courseId)[0]?.semester || Semester.First,
        };
        this.grades.push(gradeRecord); // Встановлюємо оцінку
    }

    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        let student: Student | undefined;
        for (let i = 0; i < this.students.length; i++) { // Цикл для пошуку студента
            if (this.students[i].id === studentId) {
                student = this.students[i];
                break;
            }
        }

        if (!student) {
            throw new Error("Студента не знайдено."); // Якщо студента не знайшли
        }

        if (newStatus === StudentStatus.Graduated && student.status !== StudentStatus.Active) {
            throw new Error("Студент повинен бути активним, щоб закінчити навчання."); // Якщо студент не активний, не можна змінити статус на випускника
        }

        student.status = newStatus; // Змінюємо статус студента
    }

    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(student => student.faculty === faculty); // Повертаємо всіх студентів конкретного факультету
    }

    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(grade => grade.studentId === studentId); // Повертаємо оцінки студента
    }

    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(course => course.faculty === faculty && course.semester === semester); // Повертаємо курси доступні для факультету і семестру
    }

    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter(g => g.studentId === studentId); // Збираємо оцінки студента
        if (studentGrades.length === 0) {
            throw new Error("Оцінок для цього студента не знайдено."); // Якщо оцінок немає
        }

        const totalGrade = studentGrades.reduce((acc, record) => acc + record.grade, 0); // Рахуємо загальну суму оцінок
        return totalGrade / studentGrades.length; // Повертаємо середній бал
    }

    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const students = this.getStudentsByFaculty(faculty); // Отримуємо всіх студентів факультету
        return students.filter(student => {
            const averageGrade = this.calculateAverageGrade(student.id); // Обчислюємо середній бал студента
            return averageGrade === Grade.Excellent; // Повертаємо тільки відмінників
        });
    }
}

// Створюємо систему управління університетом
const universitySystem = new UniversityManagementSystem();

// Створюємо студента
const student1 = universitySystem.enrollStudent({
    fullName: "Іван Іванов",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2022-09-01"),
    groupNumber: "CS-2022-01"
});

// Створюємо курс для реєстрації
const course1: Course = {
    id: 1,
    name: "Основи програмування",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
};

// Додаємо курс
universitySystem.addCourse(course1);

// Реєструємо студента на курс
universitySystem.registerForCourse(student1.id, course1.id);

// Виставляємо оцінку
universitySystem.setGrade(student1.id, course1.id, Grade.Excellent);

console.log(universitySystem.getStudentGrades(student1.id)); // Переглядаємо оцінки студента
