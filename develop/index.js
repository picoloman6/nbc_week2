import dotenv from 'dotenv';

dotenv.config();

// DOM 요소
const $main = document.querySelector('.main');
const $body = document.querySelector('body');
const $searchInput = document.querySelector('.search-input');
const $searchButton = document.querySelector('.search-button');
const $serachResetButton = document.querySelector('.search-reset-button');
const $pageLabel = document.querySelector('.page-label');
const $pageInput = document.querySelector('.page-input');
const $pageButton = document.querySelector('.page-button');

// 전역 상태
let page = 1;
let totalPages = null;
const cache = {};

// 영화 정보 가져오기
const getData = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TOKEN
    }
  };

  try {
    const data = await fetch(url, options).then((res) => res.json());
    const results = data.results.map((v) => ({
      id: v['id'],
      title: v['title'],
      rating: v['vote_average'],
      posterUrl: `https://image.tmdb.org/t/p/w500${v['poster_path']}`,
      overview: v['overview']
    }));

    if (totalPages === null) {
      totalPages = data['total_pages'];
      $pageLabel.textContent = `페이지 변경(최대 ${totalPages})`;
    }

    if (!cache[page]) {
      cache[page] = results;
    }

    return results;
  } catch (e) {
    console.log(e);
  }
};

// 영화 정보 DOM 생성
const makeMovieCard = (data) => {
  const { id, title, rating, posterUrl, overview } = data;

  const $wrapper = document.createElement('li');
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
  $rating.textContent = `Average Rating : ${String(rating).padEnd(5, '0')}`;
  $image.src = posterUrl;
  $image.alt = 'no photo';
  $image.dataset.id = id;
  $image.dataset.title = title;
  $image.dataset.rating = rating;
  $overview.textContent = overview;

  $image.addEventListener('click', async (e) => {
    const InfoModal = await import('./modal');
    const modal = InfoModal.default(e.target.dataset, $body);

    $body.appendChild(modal);
    $body.style.overflow = 'hidden';
  });

  $wrapper.appendChild($image);
  $wrapper.appendChild($title);
  $wrapper.appendChild($overview);
  $wrapper.appendChild($rating);

  $main.appendChild($wrapper);
};

// 페이지 렌더링 후 이벤트
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await getData();
    data.forEach((v) => {
      makeMovieCard(v);
    });
  } catch (e) {
    console.log(e);
  }
});

// 제목 검색
$searchButton.addEventListener('click', (e) => {
  const text = $searchInput.value.toLowerCase();
  const movieCards = document.querySelectorAll('.movie-card');
  const errMsg = document.querySelector('.search-err-msg');
  const result = [];

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

  movieCards.forEach((v) => {
    const title = v.childNodes[1].textContent.toLowerCase();
    title.includes(text) && result.push(v);
  });

  if (result.length === 0) {
    errMsg.textContent = '일치하는 제목이 없습니다.';
    errMsg.classList.remove('hidden');
    return;
  }

  movieCards.forEach((v) => {
    if (!result.includes(text)) {
      v.classList.add('hidden');
    } else {
      v.classList.remove('hidden');
    }
  });

  errMsg.classList.add('hidden');
});

// 페이지 변경
$pageButton.addEventListener('click', async (e) => {
  let data;
  const value = $pageInput.value;
  const num = value * 1;
  const errMsg = document.querySelector('.page-err-msg');

  e.preventDefault();

  if (!/^[0-9]{1,3}$/g.test(value) || num < 1 || num > totalPages) {
    errMsg.textContent = `1 ~ ${totalPages} 사이를 입력하세요.`;
    errMsg.classList.remove('hidden');
    return;
  }

  // 데이터 캐싱
  page = num;
  if (cache[page]) {
    data = cache[page];
  } else {
    try {
      data = await getData();
    } catch (e) {
      console.log(e);
    }
  }

  while ($main.firstChild) {
    $main.removeChild($main.firstChild);
  }

  data.forEach((v) => {
    makeMovieCard(v);
  });

  errMsg.classList.add('hidden');
});

// 초기화 누르면 검색 이전으로
$serachResetButton.addEventListener('click', () => {
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach((v) => {
    if (v.classList.contains('hidden')) {
      v.classList.remove('hidden');
    }
  });
});
