import express from "express";
import { createTag, deleteTask, getTags } from "../database/tagService";
import { ensureAuthenticated } from "./auth";

const router = express.Router();

router.use(express.json());

router.use(ensureAuthenticated);

// get all Tags
router.get("/", (req, res) => {
  getTags().then((result) => res.send(result));
});

// create Tag
router.post("/", (req, res) => {
  createTag(req.body).then((result) => res.send(result));
});

// delete Tag
router.delete("/:_id", (req, res) => {
  deleteTask(req.params._id).then((result) => res.send(result));
});

export default router;
