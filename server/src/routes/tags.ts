import express from "express";
import { createTag, deleteTag, getTag, getTags } from "../database/tagService";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { getErrorMessage } from "../utils/utils";

const router = express.Router();

router.use(express.json());

router.use(ensureAuthenticated);

// get all Tags
router.get("/", async (req, res) => {
  try {
    if (!req.user) {
      throw Error("Authentication error");
    }
    const result = await getTags(req.user.id);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

// create Tag
router.post("/", async (req, res) => {
  try {
    let tag = req.body;
    tag = {
      ...tag,
      userId: req.user?.id,
    };
    const tagId = await createTag(tag);
    res.json({ tagId });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

// delete Tag
router.delete("/:tagId", async (req, res) => {
  try {
    // make sure tag belongs to the authenticated user first
    const tag = await getTag(req.params.tagId);
    if (tag && tag.userId === req.user?.id) {
      await deleteTag(req.params.tagId);
      res.status(204).send();
      return;
    }
    res
      .status(401)
      .json({ message: "Tag does not exist or not authorized to access" });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

export default router;
