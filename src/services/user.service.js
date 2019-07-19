export const userService = {
    signUp,
    signIn,
    getProfile,
    editProfile
};

function signUp(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };

    return fetch(`/api/signup`, requestOptions)
            .then(handleResponse)
            .then(data => {
                if (data && data.data) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    localStorage.setItem('access_token', JSON.stringify(data.access_token));
                }
                return data;
            });
}
function signIn(formData) {
    console.log(formData, 'formData')
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };

    return fetch(`/api/signin`, requestOptions)
            .then(handleResponse)
            .then(data => {
                if (data && data.data) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    localStorage.setItem('access_token', JSON.stringify(data.access_token));
                }
                return data;
            });
}
function getProfile(id) {
    const requestOptions = {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'access_token': JSON.parse(localStorage.getItem('access_token'))},
    };

    return fetch(`/api/profile/${id}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                return user;
            });
}
function editProfile(formData, id) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };

    return fetch(`/api/profile/edit/${id}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                return user;
            });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
//        headers: authHeader()
    };

    return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
//                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}