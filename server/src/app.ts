import express, { Request, Response } from "express";
import {
  getTask,
  editTask,
  createTask,
  deleteTask,
  getTasks,
} from "./database/dataService";
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

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
  console.log(`Example app listening on port ${port}`);
});
