import { Redis } from "ioredis";

import { Request, Response } from "express";
interface CustomSession {
  userId: number | null;
  userRole: string | null;
  teacherAt: number | null;
  studentAt: number[] | null;
}

export type MyContext = {
  req: Request & { session: CustomSession };
  redis: Redis;
  res: Response;
};
