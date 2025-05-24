import express from "express";
import tasks from "./routes/tasks";
import tags from "./routes/tags";
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
app.use("/api/tasks", tasks);

app.use("/api/tags", tags);

app.listen(port, () => {
  console.log(`Tasks API listening on port ${port}`);
});
