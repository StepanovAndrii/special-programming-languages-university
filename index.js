"use strict";
// Type alias дозволяє створити Union type.
// Робота з масивами даних:
let professors;
let classrooms;
let courses;
let schedule;
const addProfessor = (professor) => {
    professors.push(professor);
};
const addLesson = (lesson) => {
    if (schedule.some(item => item === lesson)) {
        return false;
    }
    schedule.push(lesson);
    return true;
};
// Функції пошуку та фільтрації:
const findAvailableClassrooms = (timeSlot, dayOfWeek) => {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber); // Знаходжу усі класи в певний день на певний час які використовуються.
    // Мепінг дозволяє створити масив саме номерів.
    return classrooms
        .filter(classroom => occupiedClassrooms.indexOf(classroom.number) === -1) // Обираю тільки ті класи, які не зайняті.
        .map(classroom => classroom.number); // Повертаю масив номерів вільних класів.
};
const getProfessorSchedule = (professorId) => {
    return schedule.filter(lesson => lesson.professorId === professorId);
};
const validateLesson = (lesson) => {
    let conflictedLesson = schedule.find(scheduleLesson => (lesson.professorId === scheduleLesson.professorId || lesson.classroomNumber === scheduleLesson.classroomNumber) &&
        lesson.dayOfWeek === scheduleLesson.dayOfWeek &&
        lesson.timeSlot === scheduleLesson.timeSlot); // Шукаю перший підходящий під умови конфлікт (нам немає різниці який саме, сам факт існування конфлікту)
    if (conflictedLesson) { // .find повертає undefined у разі якщо нічого не знайшов. undefined в if перетворюється у false.
        return {
            type: conflictedLesson.professorId === lesson.professorId ? "ProfessorConflict" : "ClassroomConflict",
            lessonDetails: conflictedLesson
        };
    }
    return null;
};
// Аналіз та звіти:
const getClassroomUtilization = (classroomNumber) => {
    const classroomLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length; // Шукаємо кількість певного класу в розкладі занять,
    // а потім порівнюємо з загальною кількістю занять.
    if (classroomLessons === 0) { // Перевіряємо на нуль бо ділити на нуль - гріх)
        return 0;
    }
    return (classroomLessons / schedule.length) * 100;
};
const getMostPopularCourseType = () => {
    const courseTypeCount = {
        "Lecture": 0,
        "Seminar": 0,
        "Lab": 0,
        "Practice": 0
    };
    schedule.forEach(lesson => {
        const course = courses.find(course => course.id === lesson.courseId);
        if (course) {
            courseTypeCount[course.type]++;
        }
    });
    let mostPopularCourseType = "Lecture";
    let maxCount = 0;
    for (const type in courseTypeCount) {
        if (courseTypeCount[type] > maxCount) {
            maxCount = courseTypeCount[type];
            mostPopularCourseType = type;
        }
    }
    return mostPopularCourseType;
};
// Модифікація даних:
const reassignClassroom = (lessonId, newClassroomNumber) => {
    // Шукаю заняття по lessonId
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (lessonIndex === -1) {
        // Якщо не знайшов — повертаю false
        return false;
    }
    const lesson = schedule[lessonIndex];
    // Перевіряю, чи не зайнята аудиторія на цей час і день
    const conflict = schedule.some(existingLesson => existingLesson.classroomNumber === newClassroomNumber &&
        existingLesson.dayOfWeek === lesson.dayOfWeek &&
        existingLesson.timeSlot === lesson.timeSlot);
    if (conflict) {
        // Якщо є конфлікт, повертаю false
        return false;
    }
    // Якщо все ок, міняю аудиторію на нову
    lesson.classroomNumber = newClassroomNumber;
    return true; // Все вдалося
};
const cancelLesson = (lessonId) => {
    // Шукаю заняття по lessonId
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (lessonIndex === -1) {
        // Якщо не знайшов — виводжу повідомлення
        console.log("Заняття не знайдено");
        return;
    }
    // Видаляю заняття зі списку
    schedule.splice(lessonIndex, 1);
    console.log(`Заняття з айді ${lessonId} було видалене.`);
};
