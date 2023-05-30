import axios from "axios";
const searchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID tJY-Zw2cXxlfHGlenyoJkT_NpJoB7yB44sJmeTtzMn8",
    },
    params: {
      query: term,
    },
  });
  debugger;
  return response.data.results;
};

export default searchImages;