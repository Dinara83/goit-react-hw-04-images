import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KYE = '31934563-bfdfc3e562fca017f9814bb5d';

axios.defaults.baseURL = BASE_URL;

export const searchApi = (searchRequest, page = 1, per_page = 12) => {
  return axios.get('/', {
    params: {
      q: searchRequest,
      page,
      key: API_KYE,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page,
    },
  });
};
