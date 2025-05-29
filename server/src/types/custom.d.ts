declare namespace Express {
  export interface Request {
    accessToken?: { value: string; exp: number | undefined };
    user?: { id: string };
  }
}
