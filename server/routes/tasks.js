const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Placeholder routes for task - expand as needed
router.get("/", auth, async (req, res) => {
    const task = await Task.find({ user: req.user.id }).sort({ created: -1 });
    res.json(task);
});

router.post("/", auth, async (req, res) => {
    const { title, description } = req.body;

    const task = new Task({ user: req.user.id, title, description });
    await task.save();
    res.json(task);
});

router.put("/:id", auth, async (req, res) => {
    const { title, description, completed, priority } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user.id) {
        res.status(401).json({ message: "Not Authorized" });
    }
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    if (typeof completed === "boolean") {
        task.completed = completed;
    }
    await task.save();
    res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404).json({ message: "Task Not found" });
    }
    if (task.user.toString() !== req.user.id) {
        res.status(401).json({ message: "Not Authorize" });
    }
    await task.deleteOne();
    res.json({ message: "Task Deleted" });
});

module.exports = router;
