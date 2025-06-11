import express from "express";
import tasks from "./routes/tasks";
import tags from "./routes/tags";
import auth from "./routes/auth";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);

app.get("/", (req, res) => {
  res.send("task-manager API");
});

// auth routes
app.use("/api/auth", auth);

// API routes
app.use("/api/users/current/tasks", tasks);

app.use("/api/users/current/tags", tags);

const server = app.listen(port, () => {
  console.log(`Tasks API listening on port ${port}`);
});

export { app, server };
