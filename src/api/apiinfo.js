export function fetchSearchMoviesBySearchTerm(searchTerm) {
    //Todo: fix api
    const url = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/trending`;

    return fetch(url).then((res) => res.json());
}

export function fetchMovieDetails(id) {
    // Default search term if none provided
    const API_URL = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/details/`;
    const  url = `${API_URL}+${id}`
    return fetch(url).then((res) => res.json());
}


export function fetchTrendingMovies() {
     // Default search term if none provided
    const url = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/trending`;
    return fetch(url).then((res) => res.json());
}

export function fetchTopRatedMovies() {
    const url = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/top-rated`;
    return fetch(url).then((res) => res.json());
}

export function fetchNowPlayingMovies() {
    const url = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/now-playing`;
    return fetch(url).then((res) => res.json());
}

export function fetchPopularMovies() {
    const url = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/popular`;
    return fetch(url).then((res) => res.json());}

// Combine movies from all endpoints, ensuring unique IDs
export async function fetchAndCombineUniqueMovies() {
    const moviesArray = await Promise.all([
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchNowPlayingMovies(),
        fetchPopularMovies()
    ]);

    const uniqueMovies = {};
    moviesArray.flat().forEach(movie => {
        uniqueMovies[movie.id] = movie; // This will overwrite duplicates
    });

    // Store the combined list in localStorage or similar
    localStorage.setItem('uniqueMovies', JSON.stringify(Object.values(uniqueMovies)));

    // Convert the object values to an array and return
    return Object.values(uniqueMovies);
}

// Retrieve stored movies if they exist
export function getStoredMovies() {
    const storedMovies = localStorage.getItem('uniqueMovies');
    return storedMovies ? JSON.parse(storedMovies) : null;
}
