const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37383891-385c0c3fa5b4b213da48ba87c';

async function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await fetch(url).then(res => res.json());

  return response;
}

const APIservices = {
  fetchImages,
};

export default APIservices;