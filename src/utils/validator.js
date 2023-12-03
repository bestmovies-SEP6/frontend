function validateCredentials(username, password) {
    if (username.length < 3) {
        throw new Error("Username must be at least 3 characters");
    }
    if (password.length < 3) {
        throw new Error("Password must be at least 3 characters");
    }
}

function validateEmail(email) {
    if (!String(email).toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
        throw new Error("Invalid email address");
    }
}

export {validateCredentials, validateEmail};