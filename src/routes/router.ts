import { Application } from "express";
import auth from "./auth";

export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/auth", auth);
}
