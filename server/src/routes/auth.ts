import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  deleteManyUserRefreshTokens,
  deleteUserRefreshToken,
  findInvalidAccessToken,
  findUser,
  findUserRefreshToken,
  insertInvalidToken,
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

    await insertUserRefreshToken(refreshToken, user._id.toHexString());

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

router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not found" });
      return;
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    const userRefreshToken = await findUserRefreshToken(
      refreshToken,
      decodedRefreshToken.userId
    );

    if (!userRefreshToken) {
      res.status(401).json({ message: "Refresh not found in DB" });
      return;
    }

    await deleteUserRefreshToken(refreshToken);

    const accessToken = jwt.sign(
      { userId: decodedRefreshToken.userId },
      process.env.ACCESS_TOKEN_SECRET!,
      { subject: "accessApi", expiresIn: "30m" }
    );

    const newRefreshToken = jwt.sign(
      { userId: decodedRefreshToken.userId },
      process.env.REFRESH_TOKEN_SECRET!,
      { subject: "refreshToken", expiresIn: "1w" }
    );

    await insertUserRefreshToken(newRefreshToken, decodedRefreshToken.userId);

    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      res.status(401).json({ message: "Refresh token invalid or expired" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// logout
router.get("/logout", ensureAuthenticated, async (req, res) => {
  try {
    await deleteManyUserRefreshTokens(req.user.id);

    await insertInvalidToken(
      req.accessToken.value,
      req.user.id,
      req.accessToken.exp
    );

    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// middleware to authenticate (export)
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    res.status(401).json({ message: "Access token not found" });
    return;
  }

  if (await findInvalidAccessToken(accessToken)) {
    res
      .status(401)
      .json({ message: "Access token invalid", code: "AccessTokenInvalid" });
  }
  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    );

    req.accessToken = { value: accessToken, exp: decodedAccessToken.exp };
    req.user = { id: decodedAccessToken.userId };

    next();
  } catch (error) {
    // verify throws error caught here
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Access token expired",
        code: "AccessTokenExpired",
      }); // client gets an AccessCodeExpired error
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Access token invalid",
        code: "AccessTokenInvalid",
      }); // exact code doesn't matter, but document it for clients
    } else {
      res.status(500).json({ message: "internal server error" });
    }
  }
}

export default router;
