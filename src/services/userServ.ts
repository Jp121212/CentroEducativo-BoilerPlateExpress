import { User } from "@prisma/client";
import prisma from "../database/client";


class ServUser {
  createUser(user: User) {
    return prisma.user.create({ data: user });
  }
  findUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }
  findalluser() {
    return prisma.user.findMany();
  }
}

export default new ServUser();