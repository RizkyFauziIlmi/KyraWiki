import axios from "axios";
import { todayString } from "./todayString";

export const getTop = async (category = 'characters', set, debug = false) => {
  const base = "https://api.jikan.moe/v4/top/"


  const response = await axios.get(
    `${base}${category}?limit=5`
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

export const search = async (query, animeSetter, adult = false, order_by = "popularity", sort = "asc", type = "all", limit = 10, min_score = 0, max_score = 10, status = "not_specified", debug = false) => {
  const responseAnime = await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query}${adult === true ? '' : '&sfw'}&order_by=${order_by}${status === "not_specified" ? '&status=' : `&status=${status}`}&sort=${sort}${type === "all" ? "&type=" : `&type=${type}`}&limit=${limit}&min_score=${min_score}&max_score=${max_score}`
  );
  animeSetter(responseAnime.data.data);
  if (debug) {
    console.log(responseAnime.data.data)
  }
};

export const getSeasonNow = async (set, debug = false, limit = 5) => {
  const response = await axios.get(`https://api.jikan.moe/v4/seasons/now?limit=${limit}`)
  set(response.data.data)
  if (debug) {
    console.log(response.data.data)
  }
}

export const getSchedules = async (set, debug = false, day = "unset", limit = -1) => {
  const response = await axios.get(`https://api.jikan.moe/v4/schedules?${day === "unset" ? "" : `filter=${day}`}${limit === -1 ? "&limit=" : `&limit=${limit}`}`)

  set(response.data.data)
  if (debug) {
    console.log(response.data.data)
    console.log(todayString())
  }
}