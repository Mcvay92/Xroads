import config from '../config';
export const userService = {
    signUp,
    signIn,
    getAllProfiles,
    getProfile,
    editProfile,
    getAll,
    logout
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
                    localStorage.setItem('access_token', data.access_token);
                }
                return data;
            });
}
function signIn(formData) {
    console.log(formData, 'formData');
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
                    localStorage.setItem('access_token', data.access_token);
                }
                return data;
            });
}
function getAllProfiles() {
    const accessToken = localStorage.getItem('access_token');
    const requestOptions = {
        method: 'GET',
        headers: {'Accept': 'application/json', 'access_token': accessToken}
    };

    return fetch(`${config.API_PATH}/allProfiles`, requestOptions)
            .then(handleResponse)
            .then(user => {
                return user;
            });
}
function getProfile(id) {
    const requestOptions = {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'access_token': localStorage.getItem('access_token')}
    };

    return fetch(`/api/profile/${id}`, requestOptions)
            .then(handleResponse)
            .then(profiles => {
                return profiles;
            });
}
function editProfile(formData, id) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };

    return fetch(`${process.env.API_PATH}/profile/edit/${id}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                return user;
            });
}

function logout() {
      console.log('logout called')
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    window.location.history.push('/')
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
            if (response.status === 401 || 403) {
                console.log('logout call')
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return (error);
        }
        return data;
    });
}