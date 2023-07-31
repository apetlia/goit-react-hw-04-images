import axios from 'axios';

export const getImages = async (search, page = 1) => {
  const responce = await axios.get('https://pixabay.com/api/', {
    params: {
      q: search,
      page: page,
      key: '36515340-d2bd45b3d1303b51fd4615e59',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 50,
    },
  });

  return responce.data.hits;
};
