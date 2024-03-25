import { Router } from "express";
import {
  createStudent,
  deleteAllStudents,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  sortStudentsByAge,
  sortStudentsByAverageGrade,
} from "./students.js";

export const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const students = await getAllStudents(filters);

    console.log(filters);

    return res.json(students);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: error.message });
  }
});

studentRouter.get("/age", async (req, res) => {
  try {
    const filters = req.query;
    const students = await sortStudentsByAge(filters);
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
studentRouter.get("/averageGrade", async (req, res) => {
  try {
    const filters = req.query;
    const students = await sortStudentsByAverageGrade(filters);
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

studentRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, gender, city, averageGrade, age } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !city ||
      !averageGrade ||
      !age
    )
      throw new Error("Invalid student data!");

    const newStudent = await createStudent(
      firstName,
      lastName,
      email,
      gender,
      city,
      averageGrade,
      age
    );

    return res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ msg: error.message });
  }
});

studentRouter.get("/:id", async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const foundStudent = await getStudentById(studentId);

    return res.json(foundStudent);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

studentRouter.patch("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    if (updateData.id) throw new Error("Invalid update data!");

    await updateStudent(studentId, updateData);

    res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

studentRouter.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    await deleteStudent(studentId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

studentRouter.delete("/", async (req, res) => {
  try {
    await deleteAllStudents();

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
