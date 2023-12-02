import axios from "axios";

async function fetchMovieDetailsById(movieId){
    const url = `https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/details/${movieId}`;
    return await getData(url);

}
async function fetchNowPlayingMovies() {
    const url = "https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/now-playing";
    return await getData(url);

}

async function fetchTrendingMovies() {
    const url = "https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/trending";
    return await getData(url);
}

async function fetchTopRatedMovies() {
    const url = "https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/top-rated";
    return await getData(url);
}

async function fetchPopularMovies() {
    const url = "https://bestmovies-api-5azra6r55a-ew.a.run.app/Movies/popular";
    return await getData(url);
}

async function fetchAndCombineVariousMovies() {
    const [trending, topRated, popular] = await Promise.all([
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchPopularMovies()
    ]);

    const allMovies = [...trending, ...topRated, ...popular];

    // Remove duplicates
    const uniqueMoviesMap = new Map();
    allMovies.forEach(movie => uniqueMoviesMap.set(movie.id, movie));

    const uniqueMovies = Array.from(uniqueMoviesMap.values());
    return  uniqueMovies.slice(0,20);

}


async function getData(url) {
    const response = await axios.get(url)
    return response.data;
}

export {fetchNowPlayingMovies, fetchAndCombineVariousMovies, fetchMovieDetailsById, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies};