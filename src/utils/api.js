import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_API
});


export const getVideo = async (id,language)=> {
  return api.get(`/videos/${id}/${language}`);
}

export function getVideoId(youtubeUrl) {
  console.log(youtubeUrl)
  if (youtubeUrl.includes("watch?v=")) {
    return youtubeUrl.split("watch?v=")[1].split("&")[0];
  } else if (youtubeUrl.includes("youtu.be/")) {
    return youtubeUrl.split("youtu.be/")[1].split("?")[0];
  } else {
    throw new Error("Invalid YouTube URL");
  }
}
/*
export const askForVideo = async (lang,link)=> {
  return api.get(`/video/${lang}/${link}`);
}



export const apiYT = axios.create({
  baseURL: "https://www.youtube.com"
});
export const playVideo = async ()=>{
  return api.get(`/iframe_api`);
}
  */