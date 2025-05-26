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
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("task-manager API");
});

// auth routes
app.use("/api/auth", auth);

// API routes
app.use("/api/tasks", tasks);

app.use("/api/tags", tags);

app.listen(port, () => {
  console.log(`Tasks API listening on port ${port}`);
});
