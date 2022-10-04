import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HttpError } from "../types/custom.error";
import ServU from "./userServ";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";


class AuthServ {
  
  
  private hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
  
  private validatePassword(hash: string, password: string) {
    return compareSync(password, hash);
  }
  private generateAccessToken(user: User) {
    const { EXPIRATION_TOKEN, SECRET_KEY } = process.env;
    const promise: (payload: any, key: string, options: any) => Promise<any> =
      promisify(jwt.sign).bind(jwt);
    return promise(
      {
        email: user.email,
      },
      SECRET_KEY || "",
      {
        expiresIn: EXPIRATION_TOKEN || "1d",
      }
    );
  }
  
//   async viewuser(){
//     const user = await ServU.findalluser();
//     return user;
//   }

  register(user: User) {
    const { password, ...rest } = user;
    return ServU.createUser({
      password: this.hashPassword(password),
      ...rest,
    });
  }

  async login(email: string, password: string) {
    const user = await ServU.findUserByEmail(email);
    if (!user) {
        return { Error: "Usuario no registrado" };
    }
    const isValid = this.validatePassword(user.password, password);
    if (!isValid) {
        return { Error: "Contraseña incorrecta  :C " };
    }
    const Token = await this.generateAccessToken(user);
    return { AccesoCorrecto : Token };
  }
}
export default new AuthServ();