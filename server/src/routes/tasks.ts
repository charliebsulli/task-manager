import express from "express";
import {
  editTask,
  createTask,
  deleteTask,
  getTasks,
  getTask,
} from "../database/taskService";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { getErrorMessage } from "../utils/utils";
const router = express.Router();

router.use(express.json());

router.use(ensureAuthenticated);

// get all Tasks for the authenticated user
router.get("/", async (req, res) => {
  try {
    if (!req.user) {
      throw Error("Authentication error");
    }
    const result = await getTasks(req.user.id);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

// edit Task
router.put("/:taskId", async (req, res) => {
  try {
    // make sure task belongs to the authenticated user first
    const task = await getTask(req.params.taskId);
    if (task && task.userId === req.user?.id) {
      // then, edit task
      await editTask(req.params.taskId, req.body);
      res.status(204).send();
      return;
    }
    res
      .status(401)
      .json({ message: "Task does not exist or not authorized to access" });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

// create Task: returns json with taskId on success
router.post("/", async (req, res) => {
  // ensure task is added for the current user
  try {
    let task = req.body;
    task = {
      ...task,
      userId: req.user?.id,
    };
    const taskId = await createTask(task);
    res.json({ taskId, userId: task.userId });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

// delete Task
router.delete("/:taskId", async (req, res) => {
  try {
    // make sure task belongs to the authenticated user first
    const task = await getTask(req.params.taskId);
    if (task && task.userId === req.user?.id) {
      await deleteTask(req.params.taskId);
      res.status(204).send();
      return;
    }
    res
      .status(401)
      .json({ message: "Task does not exist or not authorized to access" });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

export default router;
