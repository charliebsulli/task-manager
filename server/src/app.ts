import express, { Request, Response } from "express";
import {
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

// get all Tasks
app.get("/api/", (req: Request, res: Response) => {
  getTasks().then((result) => res.send(result));
});

// edit Task
app.put("/api/", (req: Request, res: Response) => {
  editTask(req.body).then((result) => res.send(result));
});

// create Task
app.post("/api/", (req: Request, res: Response) => {
  createTask(req.body).then((result) => res.send(result));
});

// delete Task
app.delete("/api/", (req: Request, res: Response) => {
  deleteTask(req.body).then((result) => res.send(result));
});

app.listen(port, () => {
  console.log(`Tasks API listening on port ${port}`);
});
