import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "@entities/User";
import { Summoner } from "@entities/Summoner";

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const users = await getRepository(User).find({
        relations: ["mainPhoto"],
      });

      return res.send(users);
    } catch (error) {
      return res.status(400).send({ error });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const repository = await getRepository(User);

      const user = await repository.create(req.body);
      const result = await repository.save(user);

      return res.send({ user: result });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { user } = req;
      const { userId } = req.params;

      const q = userId === "me" ? user.id : userId;

      const summoner = await getRepository(Summoner).findOne({
        where: { user: q },
      });

      const findUser = await getRepository(User).findOne(q, {
        relations: ["photos"],
      });

      delete findUser.password;

      return res.send({ ...findUser, summoner });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const repository = await getRepository(User);
      await repository.update({ id: req.user.id }, req.body);

      return res.send({ updated: true });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
}
