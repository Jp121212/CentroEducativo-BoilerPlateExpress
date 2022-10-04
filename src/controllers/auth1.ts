import { Request, Response } from "express";
import { LoginSchema, RegisterUserSchema } from "../modelos/models";
import authServ from "../services/auth";
import { BaseController } from "../types/base.controller";

class AuthControl extends BaseController {

  async Userlogin(req: Request, res: Response) {
    try {
      const data = await LoginSchema.validateAsync(req.body);
      const result = await authServ.login(data.email, data.password);
      this.responseHandler(res, result, 201);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  } async UserRegister(req: Request, res: Response) {
    try {
      const data = await RegisterUserSchema.validateAsync(req.body);
      const result = await authServ.register(data);
      this.responseHandler(
        res,
        { message: `Usuario ${result.name} creado correctamente :)` },
        201
      );
    } catch (error: any) {
      if (error.code) {
        this.responseHandler(res, { error: "Usuario ya registrado :c" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }
   async userview(req: Request,res: Response) {
     try {
      const result = await authServ.viewuser();
      this.responseHandler(res, result, 201);
    } catch (error: any) {
       this.errorHandler(res, error);
    }
    }
 

}

export default new AuthControl();