BASEURL = 'https://image.tmdb.org/t/p/original/'

window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}

function fetchMovies(url, dom_element, path_type) {
  fetch(url)
  .then(response => {
    if (response.ok){
      return response.json()
    } else {
      throw new Error('Something went wrong')
    }
  })
  .then(data => showMovies(data, dom_element, path_type))
  .catch(error =>{
    console.log(error)
  })
}

showMovies = (movies, dom_element, path_type) => {

  let moviesSelection = document.querySelector(dom_element)
  movies.results.forEach(movie => {
    let imageElement = document.createElement('img')
    imageElement.setAttribute('data-id', movie.id)
    imageElement.src = `${BASEURL}${movie[path_type]}`
    moviesSelection.appendChild(imageElement)
  });


  }

function getOriginals() {
  let originalUrl = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(originalUrl, '.original__movies', 'poster_path')
}

function getTrendingNow() {
  let trendingUrl = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(trendingUrl, '#trending', 'backdrop_path')
}

function getTopRated() {
  let topUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(topUrl, '#top_rated', 'backdrop_path')
}





