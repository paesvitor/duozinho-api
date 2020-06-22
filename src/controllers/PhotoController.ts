import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Photo } from "@entities/Photo";

export class PhotoController {
  static async list(req: Request, res: Response) {
    try {
      const { user } = req;

      const photos = await getRepository(Photo).find({
        where: {
          user: user.id,
        },
      });

      return res.send(photos);
    } catch (error) {
      return res.status(400).send({ error });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const repository = await getRepository(Photo);

      const row = await repository.create({ ...req.body, user: req.user.id });
      await repository.save(row);

      return res.status(201).send({ created: true });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
}
