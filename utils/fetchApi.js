import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com/';

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
      'X-RapidAPI-Key': 'fcf6e44f50msh1ad02bbabe93da3p19dcd8jsn4180730b54e1',
    },
  });
  return data;
};
