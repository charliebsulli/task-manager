import express, { Request, Response } from "express";
import {
  editTask,
  createTask,
  deleteTask,
  getTasks,
} from "../database/taskService";
import { ensureAuthenticated } from "./auth";
import { getErrorMessage } from "../utils/utils";
const router = express.Router();

router.use(express.json());

router.use(ensureAuthenticated);

// get all Tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw Error("Authentication middleware error");
    }
    const result = await getTasks(req.user.id);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

// edit Task
router.put("/:_id", (req: Request, res: Response) => {
  editTask(req.params._id, req.body).then((result) => res.send(result));
});

// create Task
router.post("/", (req: Request, res: Response) => {
  createTask(req.body).then((result) => res.send(result));
});

// delete Task
router.delete("/:_id", (req: Request, res: Response) => {
  deleteTask(req.params._id).then((result) => res.send(result));
});

export default router;
