
const mongoose = require("mongoose");
const Student = require("../models/Student");

const fields = [
  "name",
  "fatherName",
  "email",
  "phone",
  "course",
  "age",
  "city"
];

function validateStudent(body, partial = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be an object";
  }

  const unknown = Object.keys(body).filter(
    key => !fields.includes(key)
  );

  if (unknown.length) {
    return `Unknown fields: ${unknown.join(", ")}`;
  }

  if (!partial && fields.some(key => body[key] === undefined)) {
    return "All student fields are required";
  }

  for (const key of fields) {
    if (body[key] === undefined) continue;

    if (key === "age") {
      if (
        typeof body.age !== "number" ||
        !Number.isInteger(body.age) ||
        body.age < 1 ||
        body.age > 120
      ) {
        return "Age must be an integer between 1 and 120";
      }
    } else if (
      typeof body[key] !== "string" ||
      !body[key].trim()
    ) {
      return `${key} must be a non-empty string`;
    }

    if (key === "email" && body.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      return "Enter a valid email address";
    }
  }

  return null;
}

function cleanData(body) {
  const data = {};

  for (const key of fields) {
    if (body[key] !== undefined) {
      data[key] = typeof body[key] === "string"
        ? body[key].trim()
        : body[key];
    }
  }

  if (data.email) {
    data.email = data.email.toLowerCase();
  }

  return data;
}

function validId(id) {
  return mongoose.isValidObjectId(id);
}

exports.createStudent = async (req, res) => {
  try {
    const error = validateStudent(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const student = await Student.create({
      ...cleanData(req.body),
      createdBy: req.userId
    });

    return res.status(201).json({
      message: "Student created successfully",
      student
    });
  } catch (error) {
    console.error("Create student error:", error.message);
    return res.status(500).json({
      message: "Unable to create student"
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      createdBy: req.userId
    }).sort({ createdAt: -1 });

    return res.json({
      count: students.length,
      students
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch students"
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    return res.json({ student });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch student"
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const error = validateStudent(req.body, true);

    if (error) {
      return res.status(400).json({ message: error });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Provide at least one field to update"
      });
    }

    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.userId
      },
      { $set: cleanData(req.body) },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    return res.json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    console.error("Update student error:", error.message);
    return res.status(500).json({
      message: "Unable to update student"
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    return res.json({
      message: "Student deleted successfully",
      student
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete student"
    });
  }
};
