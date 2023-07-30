import axios from 'axios';

// class Pixabay {
//   constructor() {
//     this.base_url = 'https://pixabay.com/api/';
//     this.query = '';
//     this.page = 1;
//     this.key = '36515340-d2bd45b3d1303b51fd4615e59';
//     this.image_type = 'photo';
//     this.orientation = 'horizontal';
//     this.per_page = 12;
//     this.currentHits = 0;
//     this.totalHits = 0;
//   }

//   async getImages(name) {
//     const responce = await axios.get(this.base_url, {
//       params: {
//         q: name,
//         page: this.page,
//         key: this.key,
//         image_type: this.image_type,
//         orientation: this.orientation,
//         per_page: this.per_page,
//       },
//     });

//     return responce.data.hits;
//   }
// }

export const getImages = async ({ search, page = 1 }) => {
  try {
    const responce = await axios.get('https://pixabay.com/api/', {
      params: {
        q: search,
        page: page,
        key: '36515340-d2bd45b3d1303b51fd4615e59',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    return responce.data.hits;
  } catch (error) {
    console.log(error);
  }
};
