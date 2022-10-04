import { Router } from "express";
import authController from "../controllers/auth1";

export default Router()
  .post("/login", (req, res) => authController.Userlogin(req, res))
  .post("/register", (req, res) => authController.UserRegister(req, res));
//   .get("/view", (req,res) => authController.userview(req,res));