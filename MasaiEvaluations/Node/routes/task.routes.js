const express = require("express");
const Task = require("../models/Task");
const verifyApiKey = require("../middleware/verifyApiKey");

const router = express.Router();
router.use(verifyApiKey);

router.get("/", async (req, res) => {
  const { status, priority, sortBy } = req.query;

  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;

  let sort = {};
  if (sortBy) sort[sortBy] = 1;

  const tasks = await Task.find(query).sort(sort);
  res.json({ success: true, count: tasks.length, data: tasks });
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  res.json({ success: true, data: task });
});

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      error: err.message
    });
  }
});

router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
});

router.patch("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({
    success: true,
    message: "Task deleted successfully"
  });
});

module.exports = router;
