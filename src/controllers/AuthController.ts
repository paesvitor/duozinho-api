import { Request, Response } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import authConfig from "@config/auth.json";
import { User } from "@entities/User";
import bcrypt from "bcrypt";

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

export class AuthController {
  static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await getRepository(User).findOne({ email });

      if (!user) {
        throw "Usuário inválido.";
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw "Senha incorreta.";
      }

      delete user.password;

      return res.send({ access_token: generateToken({ id: user.id }) });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
}
