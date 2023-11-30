const API_URL = "https://www.omdbapi.com/?apikey=e8ebe675";

export function fetchMovies(searchTerm) {
     // Default search term if none provided
    const url = `${API_URL}&s=${encodeURIComponent(searchTerm)}`;
    return fetch(url).then((res) => res.json());
}

export function fetchInitialMovies() {
    const API_URL_Now_Playing = "https://bestmovies-api-5azra6r55a-ew.a.run.app/Movie/now-playing"
    const url = `${API_URL_Now_Playing}`;
    // console.log(url)
    return fetch(url).then((res) => res.json());
}

export function fetchNowPlaying(){
    const API_URL_Now_Playing = "https://bestmovies-api-5azra6r55a-ew.a.run.app/Movie/now-playing"
    const url = `${API_URL_Now_Playing}`;
    return fetch(url).then((res) => res.json());
}