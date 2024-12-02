var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "\u0410\u043A\u0442\u0438\u0432\u043D\u0438\u0439";
    StudentStatus["Academic_Leave"] = "\u0410\u043A\u0430\u0434\u0435\u043C\u0456\u0447\u043D\u0430 \u0432\u0456\u0434\u043F\u0443\u0441\u0442\u043A\u0430";
    StudentStatus["Graduated"] = "\u0412\u0438\u043F\u0443\u0441\u043A\u043D\u0438\u043A";
    StudentStatus["Expelled"] = "\u0412\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439";
    CourseType["Optional"] = "\u041D\u0435\u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439";
    CourseType["Special"] = "\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0438\u0439";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "\u041F\u0435\u0440\u0448\u0438\u0439";
    Semester["Second"] = "\u0414\u0440\u0443\u0433\u0438\u0439";
})(Semester || (Semester = {}));
var Grade;
(function (Grade) {
    Grade[Grade["Excellent"] = 5] = "Excellent";
    Grade[Grade["Good"] = 4] = "Good";
    Grade[Grade["Satisfactory"] = 3] = "Satisfactory";
    Grade[Grade["Unsatisfactory"] = 2] = "Unsatisfactory";
})(Grade || (Grade = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "\u041A\u043E\u043C\u043F'\u044E\u0442\u0435\u0440\u043D\u0456 \u043D\u0430\u0443\u043A\u0438";
    Faculty["Economics"] = "\u0415\u043A\u043E\u043D\u043E\u043C\u0456\u043A\u0430";
    Faculty["Law"] = "\u041F\u0440\u0430\u0432\u043E";
    Faculty["Engineering"] = "\u0406\u043D\u0436\u0435\u043D\u0435\u0440\u0456\u044F";
})(Faculty || (Faculty = {}));
var UniversityManagementSystem = /** @class */ (function () {
    function UniversityManagementSystem() {
        this.students = []; // Тут зберігаємо студентів
        this.courses = []; // Тут зберігаємо курси
        this.grades = []; // Тут оцінки студентів
        this.registrations = []; // Тут зберігаємо реєстрації студентів на курси
    }
    UniversityManagementSystem.prototype.enrollStudent = function (student) {
        var newStudent = __assign(__assign({}, student), { id: this.students.length + 1 });
        this.students.push(newStudent); // Додаємо студента в список
        return newStudent; // Повертаємо нового студента
    };
    UniversityManagementSystem.prototype.addCourse = function (course) {
        this.courses.push(course); // Додаємо курс до системи
    };
    UniversityManagementSystem.prototype.registerForCourse = function (studentId, courseId) {
        var student = this.students.filter(function (s) { return s.id === studentId; })[0]; // Використовуємо filter, щоб отримати перший елемент
        var course = this.courses.filter(function (c) { return c.id === courseId; })[0]; // Теж filter для курсу
        if (!student || !course) {
            throw new Error("Студента або курсу не знайдено."); // Якщо студента чи курс не знайшли
        }
        if (student.faculty !== course.faculty) { // Перевіряємо, чи студент і курс з одного факультету
            throw new Error("Студент і курс повинні належати до одного факультету.");
        }
        var enrolledStudents = this.registrations.filter(function (r) { return r.courseId === courseId; }).map(function (r) { return r.studentId; }); // Перевіряємо, скільки студентів вже записано на курс
        if (enrolledStudents.length >= course.maxStudents) { // Якщо місць вже немає
            throw new Error("Курс вже заповнений.");
        }
        this.registrations.push({ studentId: studentId, courseId: courseId }); // Реєструємо студента на курс
    };
    UniversityManagementSystem.prototype.setGrade = function (studentId, courseId, grade) {
        var _a;
        var registration;
        for (var i = 0; i < this.registrations.length; i++) { // Використовуємо цикл для пошуку реєстрації
            if (this.registrations[i].studentId === studentId && this.registrations[i].courseId === courseId) {
                registration = this.registrations[i];
                break; // Виходимо з циклу, як тільки знайшли
            }
        }
        if (!registration) {
            throw new Error("Студент не зареєстрований на цей курс."); // Якщо студент не записаний на курс
        }
        var gradeRecord = {
            studentId: studentId,
            courseId: courseId,
            grade: grade,
            date: new Date(),
            semester: ((_a = this.courses.filter(function (c) { return c.id === courseId; })[0]) === null || _a === void 0 ? void 0 : _a.semester) || Semester.First,
        };
        this.grades.push(gradeRecord); // Встановлюємо оцінку
    };
    UniversityManagementSystem.prototype.updateStudentStatus = function (studentId, newStatus) {
        var student;
        for (var i = 0; i < this.students.length; i++) { // Цикл для пошуку студента
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
    };
    UniversityManagementSystem.prototype.getStudentsByFaculty = function (faculty) {
        return this.students.filter(function (student) { return student.faculty === faculty; }); // Повертаємо всіх студентів конкретного факультету
    };
    UniversityManagementSystem.prototype.getStudentGrades = function (studentId) {
        return this.grades.filter(function (grade) { return grade.studentId === studentId; }); // Повертаємо оцінки студента
    };
    UniversityManagementSystem.prototype.getAvailableCourses = function (faculty, semester) {
        return this.courses.filter(function (course) { return course.faculty === faculty && course.semester === semester; }); // Повертаємо курси доступні для факультету і семестру
    };
    UniversityManagementSystem.prototype.calculateAverageGrade = function (studentId) {
        var studentGrades = this.grades.filter(function (g) { return g.studentId === studentId; }); // Збираємо оцінки студента
        if (studentGrades.length === 0) {
            throw new Error("Оцінок для цього студента не знайдено."); // Якщо оцінок немає
        }
        var totalGrade = studentGrades.reduce(function (acc, record) { return acc + record.grade; }, 0); // Рахуємо загальну суму оцінок
        return totalGrade / studentGrades.length; // Повертаємо середній бал
    };
    UniversityManagementSystem.prototype.getTopStudentsByFaculty = function (faculty) {
        var _this = this;
        var students = this.getStudentsByFaculty(faculty); // Отримуємо всіх студентів факультету
        return students.filter(function (student) {
            var averageGrade = _this.calculateAverageGrade(student.id); // Обчислюємо середній бал студента
            return averageGrade === Grade.Excellent; // Повертаємо тільки відмінників
        });
    };
    return UniversityManagementSystem;
}());
// Створюємо систему управління університетом
var universitySystem = new UniversityManagementSystem();
// Створюємо студента
var student1 = universitySystem.enrollStudent({
    fullName: "Іван Іванов",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2022-09-01"),
    groupNumber: "CS-2022-01"
});
// Створюємо курс для реєстрації
var course1 = {
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
