import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Op } from "@entities/Op";
import { User } from "@entities/User";

export class OpController {
  static async create(req: Request, res: Response) {
    try {
      const { user } = req;
      const { userId, action } = req.body;

      const liked = await getRepository(User).findOne(userId);

      if (!liked) {
        return res.status(400).send({ error: "Usuário não existe." });
      }

      if (liked.id === user.id) {
        return res
          .status(403)
          .send({ error: "Não é possivel dar like em si mesmo." });
      }

      const likedUserLikedBack = await getRepository(Op).findOne({
        where: { liked: user.id, user: liked.id },
      });

      // Reject
      if (action === "reject") {
        if (likedUserLikedBack) {
          await getRepository(Op).update(likedUserLikedBack.id, {
            status: "reject",
          });
        } else {
          const row = await getRepository(Op).create({
            user,
            liked,
            status: "reject",
          });
          await getRepository(Op).save(row);
        }

        return res.send({ rejected: true });
      }

      // Like and match
      if (!likedUserLikedBack && action === "like") {
        const row = getRepository(Op).create({ user, liked });
        await getRepository(Op).save(row);
        return res.send({ liked: true });
      } else {
        if (likedUserLikedBack.status === "match") {
          return res
            .status(400)
            .send({ error: "Você já deu match com esse usuário." });
        }

        if (!likedUserLikedBack.status) {
          await getRepository(Op).update(likedUserLikedBack.id, {
            status: "match",
          });
          return res.send({ match: true });
        } else if (likedUserLikedBack.status === "reject") {
          return res.send({ match: false });
        }
      }
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(400)
          .send({ error: "Você já deu like nesse usuário" });
      }

      console.log(error);
      return res.status(400).send({ error });
    }
  }
}
