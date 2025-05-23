import express, { Request, Response } from "express";
import {
  editTask,
  createTask,
  deleteTask,
  getTasks,
} from "../database/taskService";
const router = express.Router();

router.use(express.json());

// get all Tasks
router.get("/", (req: Request, res: Response) => {
  getTasks().then((result) => res.send(result));
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
