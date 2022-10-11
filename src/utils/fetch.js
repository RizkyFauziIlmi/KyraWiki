import axios from "axios";

export const getTop = async (category = 'characters', set, debug = false) => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/${category}?limit=5`
    );
    set(response.data.data);
};

export const getByIdFull = async (id = 0, category, set, debug = false) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/${category}/${id}/full`
  );
  set(response.data.data);
  if (debug) {
    console.log(response.data.data)
  }
};

export const getRandom = async (genre = "anime", set, debug = false) => {
  const response = await axios.get(`https://api.jikan.moe/v4/random/${genre}`);
  set(response.data.data);
  if (debug) {
    console.log(response.data.data)
  }
};

export const search = async (query, animeSetter, mangaSetter, limit, order_by, sort) => {
  const responseAnime = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query}&limit=${limit}&order_by=${order_by}&sort=${sort}`
  );
  const responseManga = await axios.get(
    `https://api.jikan.moe/v4/manga?q=${query}&limit=${limit}&order_by=${order_by}&sort=${sort}`
  );
  const animeDatas = responseAnime.data.data;
  animeSetter(animeDatas);
  const mangaDatas = responseManga.data.data;
  mangaSetter(mangaDatas);
};