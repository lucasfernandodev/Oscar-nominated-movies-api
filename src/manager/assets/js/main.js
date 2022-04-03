
  let allData = [];
  let moviesData = [];


  const viewThumbImg = document.querySelector('.view-thumb .thumb');
  const selectEl = document.querySelector(".chose-movie select");
  const selectAllInputs = document.querySelectorAll('input');

  const id = document.querySelector('#id');
  const thumb = document.querySelector('#thumb');
  const title = document.querySelector('#title');
  const category = document.querySelector('#category');
  const genre = document.querySelector('#genre');
  const director = document.querySelector('#director');
  const year = document.querySelector('#year');
  const duration = document.querySelector('#duration');
  const score = document.querySelector('#score');
  const link = document.querySelector('#link');

  const formSubmit =  document.querySelector('.btn-submit')

  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
  }, false)

  formSubmit.addEventListener('click', req, false);
  async function req(e){
    e.preventDefault();

    if(id.value === ''){
      return false
    }

    formSubmit.disabled = true;
    formSubmit.classList.add('disabled');
    formSubmit.classList.remove('active');

    const movieId = id.value;
    const MovieData = JSON.stringify({
      id: id.value,
      thumb: thumb.value,
      title: title.value,
      category: category.value,
      genre: genre.value,
      link: link.value,
      score: score.value,
      duration: duration.value,
      year: year.value,
      director: director.value,
    })

    const url = `http://127.0.0.1:3333/movies/${movieId}`;

    setTimeout(async () => {
      const response = await fetch(url, {
        method: "put",
        body: MovieData,
        headers: {
          'Content-type': 'application/json', // Indicates the content 
          "Accept": "application/json"
        },
      })
  
      const result = await response.json();
    },500)

  }

  async function fetchAPI() {
    const moviesList = await fetch("http://localhost:3333/movies");


    if (moviesList.status !== 400) {

      const result = await moviesList.json();
      allData.push(result);

      for (let i = 1; i < result.pagination; i++) {

        const moviesList = await fetch(
          `http://localhost:3333/movies?skip=${i}`
        );

        const result = await moviesList.json();
        allData.push(result);
      }

      allData.map(movies => {
        movies.data.map(movie => {

          const option = document.createElement("option");
          option.id = movie.id;
          option.value = movie.title;
          option.innerText = movie.title;

          selectEl.appendChild(option);

          moviesData.push(movie)
        });
      });

      function handlerOnChange(e) {
        const element = e.target;
        const value = element.value;

        if (value === 'movies') {
          selectAllInputs.forEach(input => {
            input.value = ''
            viewThumbImg.src = './teste.png';
          })

          return;
        }

        function filterMovie(movie) {
          return movie.title.includes(value) ? movie : null
        }

        const isMovie = moviesData.filter(filterMovie)

        if (isMovie !== null) {
          const movie = isMovie[0]
          viewThumbImg.src = movie.thumb;

          id.value = movie.id;
          thumb.value = movie.thumb;
          title.value = movie.title;
          category.value = movie.category;
          genre.value = movie.genre;
          director.value = movie.director;
          year.value = movie.year.length > 4 ? new Date(movie.year).getFullYear(): movie.year;
          duration.value = movie.duration;
          score.value = movie.score;
          link.value = movie.link;
        }

        if (formSubmit.classList.contains('disabled')) {
          formSubmit.classList.remove('disabled');
          formSubmit.classList.add('active');
          formSubmit.disabled = false;
        }

      }

      selectEl.onchange = e => handlerOnChange(e)
    }
  }


  function transformFirstLetterInUppercase() {
    selectAllInputs.forEach(input => {
      if(input.type === 'submit'){
        return;
      }
      let text = input.placeholder;

      text = text[0].toUpperCase() + text.substr(1)
      input.placeholder = text;
    })
  }



  transformFirstLetterInUppercase();
  fetchAPI()