import axios from "axios";

const API_URL = "https://bestmovies-api-5azra6r55a-ew.a.run.app";

async function login(username, password) {
    const response = await axios.post(`${API_URL}/auth/login`, {username, password});
    alert(response.data);

    sessionStorage.setItem("user", response.data);
}

async function register(username, email, password) {
    const response = await axios.post(`${API_URL}/auth/register`, {username, email, password});
    alert(response.data);

    sessionStorage.setItem("user", response.data);

}

export  {login, register};