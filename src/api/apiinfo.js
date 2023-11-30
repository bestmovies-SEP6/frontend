const API_URL = "https://www.omdbapi.com/?apikey=e8ebe675";

export function fetchMovies(searchTerm) {
     // Default search term if none provided
    const url = `${API_URL}&s=${encodeURIComponent(searchTerm)}`;

    return fetch(url).then((res) => res.json());
}

export function fetchInitialMovies() {
    const initialQuery = 'Nepal'; // Replace with your initial search term or API endpoint
    const url = `${API_URL}&s=${encodeURIComponent(initialQuery)}`;

    return fetch(url).then((res) => res.json());
}
