import axios from "axios";

export const getTrack = (params) => {
  return axios
    .get(`/api/track-details`, {
      headers: {
        "content-type": "application/json",
      },
      params: params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log("[ERROR]", err));
};

export const download = (params) => {
  return axios
    .get(`/api/download`, {
      headers: {
        "content-type": "audio/mpeg",
        "Content-Disposition": "filename='music.mp3'",
      },
      responseType: "blob",
      params: params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log("[ERROR]", err));
};
