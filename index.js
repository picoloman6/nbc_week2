// DOM 요소
const $main = document.querySelector('main');

const getData = async () => {
  const url =
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjM1M2M1MTkxNzc3NWFlZDcyYWZmNjJlNWJkZGMwMyIsInN1YiI6IjY1OTM2YTYwNmFhOGUwNjFhYmVjMWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgnLHM5qNXl0q__xNlRIeAZ-vBkkosYaVbM3OL7w-ak'
    }
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    const results = data.results.map(v => ({
      title: v['title'],
      overview: v['overview'],
      poster: `https://image.tmdb.org/t/p/w500${v['poster_path']}`
    }));
    return results;
  } catch (e) {
    console.log(e);
  }
};

const makeMovieCard = data => {
  const { poster, title, overview } = data;

  const $wrapper = document.createElement('div');
  const $image = document.createElement('img');
  const $title = document.createElement('div');
  const $content = document.createElement('div');

  $wrapper.className = 'movie-card';
  $image.className = 'movie-card-image';
  $title.className = 'movie-card-title';
  $content.className = 'movie-card-content';

  if (title.length > 24) {
    $title.classList.add('slide-text');
  }

  $image.src = `${poster}`;
  $image.alt = 'no photo';
  $title.textContent = title;
  $content.textContent = overview;

  $wrapper.appendChild($image);
  $wrapper.appendChild($title);
  $wrapper.appendChild($content);
  $main.appendChild($wrapper);
};

document.addEventListener('DOMContentLoaded', async () => {
  //   const data = await getData();
  const data = [];

  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      data.push({
        title: 'The Shawshank Redemption',
        overview:
          'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
        poster:
          'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'
      });
    } else {
      data.push({
        title: 'The Lord of the Rings: The Return of the King',
        overview:
          'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
        poster:
          'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'
      });
    }
  }

  data.forEach(v => {
    makeMovieCard(v);
  });
});
