import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findInvalidAccessToken } from "../database/userService";
import { getEnvVar, getErrorMessage } from "../utils/utils";

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
    return;
  }
  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      getEnvVar("ACCESS_TOKEN_SECRET")
    );

    if (typeof decodedAccessToken === "string") {
      throw Error("JWT payload must be an object, not a string");
    }

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
      res.status(500).json({ error: getErrorMessage(error) });
    }
  }
}
