const BASE_API = 'https://pixabay.com/api/';
const ACCESS_KEY = '24444752-6eeb7e9783b35bc5419290dda';

export function fetchImages(searchQuery) {
  return fetch(
    `${BASE_API}?q=${searchQuery}&page=1&key=${ACCESS_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`There are no picturs with name ${searchQuery}`)
    );
  });
}
