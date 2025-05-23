import express, { Request, Response } from "express";
import {
  editTask,
  createTask,
  deleteTask,
  getTasks,
} from "./database/dataService";
import tasks from "./routes/tasks";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// API routes
app.use("/api", tasks);

app.listen(port, () => {
  console.log(`Tasks API listening on port ${port}`);
});
