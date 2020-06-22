import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Photo } from "@entities/Photo";

export class PhotoController {
  static async list(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const photos = await getRepository(Photo).find({
        where: {
          user: userId,
        },
      });

      return res.send({ data: photos });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const repository = await getRepository(Photo);

      const row = await repository.create(req.body);
      await repository.save(row);

      return res.send({ created: true });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
}
