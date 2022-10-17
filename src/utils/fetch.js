import axios from "axios";
import { todayString } from "./todayString";

export const getTop = async (category = 'characters', set, debug = false, setLoading) => {
  await axios.get(
    `https://api.jikan.moe/v4/top/${category}?limit=5`
  )
    .then((response) => {
      set(response.data.data);
      setTimeout(() => {
        setLoading(true)
      })
    })
    .catch((error) => {
      console.log(error)
    })
};

export const getByIdFull = async (id = 0, category, set, debug = false, setIsLoaded) => {
  await axios.get(
    `https://api.jikan.moe/v4/${category}/${id}/full`
  )
    .then((response) => {
      set(response.data.data);
      if (debug) {
        console.log(response.data.data)
      }
      setTimeout(() => {
        setIsLoaded(true)
      })
    })
    .catch((error) => {
      console.log(error)
    })
};

export const getRandom = async (genre = "anime", set, debug = false, setIsLoaded) => {
  await axios.get(`https://api.jikan.moe/v4/random/${genre}`)
    .then((response) => {
      set(response.data.data);
      if (debug) {
        console.log(response.data.data)
      }
      setTimeout(() => {
        setIsLoaded(true)
      })
    })
    .catch((error) => {
      console.log(error)
    })
};

export const search = async (query, animeSetter, adult = false, order_by = "popularity", sort = "asc", type = "all", limit = 10, min_score = 0, max_score = 10, status = "not_specified", debug = false, isLoaded) => {
  await axios.get(
    `https://api.jikan.moe/v4/anime?q=${query}${adult === true ? '' : '&sfw'}&order_by=${order_by}${status === "not_specified" ? '&status=' : `&status=${status}`}&sort=${sort}${type === "all" ? "&type=" : `&type=${type}`}&limit=${limit}&min_score=${min_score}&max_score=${max_score}`
  )
    .then((response) => {
      animeSetter(response.data.data);
      if (debug) {
        console.log(response.data.data)
      }
      setTimeout(() => {
        isLoaded(true)
      })
    })
    .catch((error) => {
      console.log(error)
    })
};

export const getSeasonNow = async (set, debug = false, limit = 5, setIsLoaded) => {
  await axios.get(`https://api.jikan.moe/v4/seasons/now?limit=${limit}`)
    .then((response) => {
      set(response.data.data)
      if (debug) {
        console.log(response.data.data)
      }
      setTimeout(() => {
        setIsLoaded(true)
      });
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getSchedules = async (set, debug = false, day = "unset", limit = -1, setIsLoaded) => {
  await axios.get(`https://api.jikan.moe/v4/schedules?${day === "unset" ? "" : `filter=${day}`}${limit === -1 ? "&limit=" : `&limit=${limit}`}`)
    .then((response) => {
      set(response.data.data)
      if (debug) {
        console.log(response.data.data)
        console.log(todayString())
      }
      setTimeout(() => {
        setIsLoaded(true)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}