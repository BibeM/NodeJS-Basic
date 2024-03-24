import { DataService } from "./data.service.js";
import { createPath } from "../utils.js";
import { Student } from "./student.model.js";

const STUDENTS_PATH = createPath(["data", "students.json"]);

const saveStudents = async (students) => {
  await DataService.saveJSONFile(STUDENTS_PATH, students);
};

export const getAllStudents = async (filters) => {
  let students = await DataService.readJSONFile(STUDENTS_PATH);

  if (filters?.gender) {
    students = students.filter((student) => student.gender === filters.gender);
  }
  return students;
};
export const sortStudentsByAge = async () => {
  let students = await DataService.readJSONFile(STUDENTS_PATH);

  students = students.sort((a, b) => b.age - a.age);

  return students;
};
export const sortStudentsByAverageGrade = async () => {
  let students = await DataService.readJSONFile(STUDENTS_PATH);

  students = students.sort((a, b) => b.averageGrade - a.averageGrade);

  return students;
};
export const createStudent = async (
  firstName,
  lastName,
  email,
  gender,
  city,
  averageGrade,
  age
) => {
  const students = await getAllStudents();

  const newStudent = new Student(
    firstName,
    lastName,
    email,
    gender,
    city,
    averageGrade,
    age
  );

  const updatedStudents = [...students, newStudent];

  await saveStudents(updatedStudents);

  return newStudent;
};

export const getStudentById = async (studentId) => {
  const students = await getAllStudents();

  const foundStudent = students.find((student) => student.id === studentId);

  if (!foundStudent) throw new Error("Student not found!");

  return foundStudent;
};

export const updateStudent = async (studentId, updateData) => {
  const students = await getAllStudents();

  if (!students.some((student) => student.id === studentId))
    throw new Error("Can't update student! Student not found!");

  const updatedStudents = students.map((student) => {
    if (student.id === studentId) {
      return { ...student, ...updateData };
    } else {
      return student;
    }
  });

  await saveStudents(updatedStudents);
};

export const deleteStudent = async (studentId) => {
  const students = await getAllStudents();

  const updatedStudents = students.filter(
    (student) => student.id !== studentId
  );

  if (updatedStudents.length === students.length)
    throw new Error("Can't delete student! Student not found!");

  await saveStudents(updatedStudents);
};

export const deleteAllStudents = async () => {
  await saveStudents([]);
};
