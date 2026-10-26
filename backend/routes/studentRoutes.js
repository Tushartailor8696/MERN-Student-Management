
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

router.use(authMiddleware);

router.route("/")
  .get(getStudents)
  .post(createStudent);

router.route("/:id")
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
