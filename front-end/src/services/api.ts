import axios from "axios";

export const api = axios.create({
  baseURL: "https://psychic-space-goldfish-6prvwxwgxr25jqw-3000.app.github.dev",
  headers: {
    "Content-Type": "application/json",
    Authorization: "06defc32-8a22-4152-8d15-834acf6456875",
  },
});
