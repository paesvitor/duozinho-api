import axios from "axios";

export default axios.create({
  baseURL: "https://br1.api.riotgames.com/lol/",
  headers: {
    "X-Riot-Token": process.env.RIOT_GAMES_API_KEY,
  },
});
