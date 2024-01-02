// DOM 요소
const $main = document.querySelector('main');
const $searchInput = document.querySelector('.search-input');
const $searchButton = document.querySelector('.search-button');

// 전역 상태
let page = 1;

// 영화 정보 가져오기
const getData = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
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
      rating: v['vote_average'],
      posterUrl: `https://image.tmdb.org/t/p/w500${v['poster_path']}`,
      overview: v['overview']
    }));
    return results;
  } catch (e) {
    console.log(e);
  }
};

// 영화 정보 DOM 생성
const makeMovieCard = data => {
  const { title, rating, posterUrl, overview } = data;

  const $wrapper = document.createElement('div');
  const $title = document.createElement('div');
  const $rating = document.createElement('div');
  const $image = document.createElement('img');
  const $overview = document.createElement('div');

  $wrapper.className = 'movie-card';
  $title.className = 'movie-card-title';
  $rating.className = 'movie-card-rating';
  $image.className = 'movie-card-image';
  $overview.className = 'movie-card-overview';

  if (title.length > 24) {
    $title.classList.add('slide-text');
  }

  $title.textContent = title;
  $rating.textContent = `Average Rating : ${rating}`;
  $image.src = posterUrl;
  $image.alt = 'no photo';
  $overview.textContent = overview;

  $wrapper.appendChild($image);
  $wrapper.appendChild($title);
  $wrapper.appendChild($overview);
  $wrapper.appendChild($rating);

  $main.appendChild($wrapper);
};

// 페이지 시작 후 이벤트
document.addEventListener('DOMContentLoaded', async () => {
  //   const data = await getData();
  const data = [];

  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) {
      data.push({
        title: 'The Shawshank Redemption',
        overview:
          'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
        rating: 8.777
      });
    } else {
      data.push({
        title: 'The Lord of the Rings: The Return of the King',
        overview:
          'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
        rating: 9.111
      });
    }
  }

  data.forEach(v => {
    makeMovieCard(v);
  });
});

// 검색
$searchButton.addEventListener('click', e => {
  const text = $searchInput.value.toLowerCase();
  const movieCards = document.querySelectorAll('.movie-card');
  const errMsg = document.querySelector('.search-err-msg');

  e.preventDefault();

  if (text === '') {
    errMsg.textContent = '글자를 입력하세요.';
    errMsg.classList.remove('hidden');
    return;
  }

  if (text.length < 2) {
    errMsg.textContent = '두 글자 이상 입력하세요.';
    errMsg.classList.remove('hidden');
    return;
  }

  movieCards.forEach(v => {
    const title = v.childNodes[1].textContent.toLowerCase();
    if (!title.includes(text)) {
      v.classList.add('hidden');
    } else {
      v.classList.remove('hidden');
    }
  });

  errMsg.classList.add('hidden');
});
