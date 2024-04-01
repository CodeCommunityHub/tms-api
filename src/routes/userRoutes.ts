// routes/userRoutes.ts

import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import _ from "lodash";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(_.pick(user, ["id", "username"]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
