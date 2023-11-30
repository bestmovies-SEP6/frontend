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


async function fetchAndCombineUniqueMovies() {
    const endpoints = [
        'https://bestmovies-api-5azra6r55a-ew.a.run.app/Movie/trending',
        'https://bestmovies-api-5azra6r55a-ew.a.run.app/Movie/top-rated',
        'https://bestmovies-api-5azra6r55a-ew.a.run.app/Movie/now-playing',
        'https://bestmovies-api-5azra6r55a-ew.a.run.app/Movie/popular',

    ];

    const uniqueMovies = {};

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.forEach(movie => {
                uniqueMovies[movie.id] = movie; // This will overwrite duplicates
            });
        } catch (error) {
            throw new Error('Error fetching movies from endpoint: ', endpoint, error);
        }
    }
    // Convert the object values to an array
    return Object.values(uniqueMovies);
}

export { fetchAndCombineUniqueMovies };
