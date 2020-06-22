import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Summoner } from "@entities/Summoner";
import riotGamesClient from "@utils/riotGamesClient";
import { User } from "@entities/User";

export class RiotGamesController {
  static async create(req: Request, res: Response) {
    try {
      const { userId, summonerName } = req.body;

      const repository = await getRepository(Summoner);

      const findUser = await getRepository(Summoner).findOne(userId);

      if (findUser) {
        throw "Summoner already registered.";
      }

      const { data: summoner } = await riotGamesClient.get(
        `summoner/v4/summoners/by-name/${summonerName}`
      );

      const verificationIcon = Math.floor(Math.random() * 28);

      const row = await repository.create({
        ...summoner,
        user: userId,
        verificationIcon,
      });
      await repository.save(row);
      return res.send({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const summoner = await getRepository(Summoner).findOne({
        where: { user: userId },
      });

      if (!summoner) {
        throw "Invocador não encontrado";
      }

      const { data } = await riotGamesClient.get(
        `summoner/v4/summoners/by-name/${summoner.name}`
      );

      if (!(data.profileIconId === summoner.verificationIcon)) {
        throw "Icone de invocador da conta não bate com o da verifiação. Altere o icone de invocador no seu client para o mesmo acima.";
      }

      await await getRepository(Summoner).update(
        { user: userId },
        { verified: true }
      );

      return res.send({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error });
    }
  }
}
