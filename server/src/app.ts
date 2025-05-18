import express, { Request, Response } from "express";
import { getTask } from "./database/dataService";
const app = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// API routes

// get task
app.get("/api/:taskId", (req: Request, res: Response) => {
  getTask(Number(req.params.taskId)).then((result) => res.send(result));
});

// edit task

// create task

// delete task

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
