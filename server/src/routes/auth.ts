import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUser,
  findUserRefreshToken,
  insertUser,
  insertUserRefreshToken,
} from "../database/userService";
import "dotenv/config";

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(422)
        .json({ message: "Please provide a username and password" });
      return;
    }

    if (await findUser(username)) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userId = await insertUser(username, hashedPassword);

    res.status(201).json({
      message: "User registered",
      id: userId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(422).json({ message: "Please fill in username and password" });
      return;
    }

    const user = await findUser(username);

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET!,
      { subject: "accessApi", expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { subject: "refreshToken", expiresIn: "1w" }
    );

    await insertUserRefreshToken(refreshToken, user._id);

    res.status(200).json({
      id: user._id,
      username: user.username,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
