import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '32900426-a12efdc1668c6b000f20a1416';
export const PER_PAGE = 12;

export const fetchPhotosWithQuery = async (query, page) => {
  const response = await axios({
    method: 'get',
    url: URL,
    params: {
      q: query,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
    },
  }).catch(error => {
    console.log('probably rest api error', error);
  });
  return response.data;
};

