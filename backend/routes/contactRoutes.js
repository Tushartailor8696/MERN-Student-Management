const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        message: "Name, email, and message are required.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email.",
      });
    }

    if (
      name.trim().length > 100 ||
      email.trim().length > 254 ||
      message.trim().length > 5000 ||
      (subject !== undefined &&
        (typeof subject !== "string" || subject.trim().length > 150))
    ) {
      return res.status(400).json({
        message: "One or more fields exceed the allowed length.",
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: typeof subject === "string" && subject.trim()
        ? subject.trim()
        : "Contact form submission",
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Your message has been sent successfully!",
      contact,
    });
  } catch (error) {
    console.error("Create contact message error:", error.message);
    res.status(500).json({
      message: "Failed to send message.",
    });
  }
});

module.exports = router;