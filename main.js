const getMovie = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRhZWI2NjdiNjQ1ODM4ODQ2ZWEyOGMwNzQzNzUzOCIsInN1YiI6IjY0NzViNGJkOTYzODY0MDExODQ4MDRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bbqTe_5cI94Uru0gj8qIpcyM0w1TykKirsKz6AtEnV8'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', getMovie)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
