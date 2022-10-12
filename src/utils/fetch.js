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

export const search = async (query, animeSetter, adult = false, order_by = "popularity", sort = "asc", type = "all", limit = 10, min_score = 0, max_score = 10, status = "not_specified",debug = false) => {
  const responseAnime = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query}${adult === true ? '' : '&sfw'}&order_by=${order_by}${status === "not_specified" ? '&status=' : `&status=${status}`}&sort=${sort}${type === "all" ? "&type=" : `&type=${type}`}&limit=${limit}&min_score=${min_score}&max_score=${max_score}`
  );
  const animeDatas = responseAnime.data.data;
  animeSetter(animeDatas);
  if (debug) {
    console.log(animeDatas)
  }
};