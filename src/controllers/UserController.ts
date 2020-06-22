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
      const { userId } = req.params;

      const user = await getRepository(User).findOne(userId, {
        relations: ["photos"],
      });

      const summoner = await getRepository(Summoner).findOne({
        where: { user: userId },
      });

      return res.send({ ...user, summoner });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { userId, ...rest } = req.body;

      const repository = await getRepository(User);
      await repository.update({ id: userId }, rest);

      return res.send({ updated: true });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
}
