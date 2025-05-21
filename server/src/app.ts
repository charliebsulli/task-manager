import express, { NextFunction, Request, Response } from "express";
import {
  getTask,
  editTask,
  createTask,
  deleteTask,
  getTasks,
} from "./database/dataService";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// API routes
app.get("/api/", (req: Request, res: Response) => {
  getTasks().then((result) => res.send(result));
});

// get Task
app.get("/api/:taskId", (req: Request, res: Response) => {
  getTask(Number(req.params.taskId)).then((result) => res.send(result));
});

// edit Task
app.put("/api/", (req: Request, res: Response) => {
  editTask(req.body).then((result) => res.send(result));
});

// create Task
app.post("/api/", (req: Request, res: Response) => {
  createTask(req.body).then((result) => res.send(result));
});

// delete Task (delete)
app.delete("/api/:taskId", (req: Request, res: Response) => {
  deleteTask(Number(req.params.taskId)).then((result) => res.send(result));
});

app.listen(port, () => {
  console.log(`Tasks API listening on port ${port}`);
});
