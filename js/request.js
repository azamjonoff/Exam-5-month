import { loading } from "./loading.js";

// const API = "https://dummyjson.com/products";

export const getData = async (url) => {
  try {
    loading(true);
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error("Something went wrong!");
    }
    const response = await request.json();
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error.message;
  }
};
