// 영화 목록 데이터 가져오기
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRhZWI2NjdiNjQ1ODM4ODQ2ZWEyOGMwNzQzNzUzOCIsInN1YiI6IjY0NzViNGJkOTYzODY0MDExODQ4MDRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bbqTe_5cI94Uru0gj8qIpcyM0w1TykKirsKz6AtEnV8'
  }
};
const getMovie = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
  const data = await response.json();
  return data;
};

const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchbtn');

// 검색 수행 
const Search = async () => {
  const keyword = searchInput.value.trim();

  if (keyword !== ' ') { // 검색 입력값이 비어있지 않은 경우 필터링 영화 카드 표시
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&query=${keyword}`, options);
    const data = await response.json();

    const filterMovies = data.results.filter((info) => {
      const title = info.title.toLowerCase(); // 영화 제목을 소문자로 가져오기
      return title.includes(keyword);
    })
    createCards(filterMovies); 
  } else { // 검색 입력이 비어있는 경우, 모든 영화 카드 표시
    getMovie().then((data) => {
      createCards(data.results);
    });
  }
};

// 검색 버튼 클릭 이벤트
searchBtn.addEventListener('click', Search);

// 검색 입력에서 Enter 키를 누를 때 이벤트
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    Search();
  }
});

// 영화 카드 생성
const createCards = (movies) => {
  const cardBox = document.querySelector('.card-box');
  cardBox.innerHTML = ''; // 카드 생성 전 비워주기

  movies.forEach((info) => {
    let id = info.id;
    let title = info.title;
    let image = `https://www.themoviedb.org/t/p/w500/${info.poster_path}`;
    let overView = info.overview;
    let rating = info.vote_average;

    // 영화 정보 HTML 생성
    let temp_html = `<div id="cards" class="card" onclick="alert('영화 id: ${id}')">
              <img src="${image}" alt="...">
              <div class="card-body">
                <h4 class="title">${title}</h4>
                <p class="contents">${overView}</p>
                <p class="rate">평점 : ${rating}</p>
              </div>
            </div>`;
    cardBox.innerHTML += temp_html;
  });
};

// 모든 영화 카드 표시
getMovie().then((data) => {
  createCards(data.results);
});

