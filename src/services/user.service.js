import config from '../config';
export const userService = {
    signUp,
    signIn,
    getAllProfiles,
    getProfile,
    editProfile,
    getAll,
    addProfile,
    uploadImage,
    logout
};

function signUp(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };
    return fetch(`/api/signup`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_valid', true)
                }
                return data;
            }).catch(error => {
        return error;
    });
}
function signIn(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    };
    return fetch(`/api/signin`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_valid', true)
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
            .then(response => response.json())
            .then(user => {
                return user;
            });
}
function getProfile(profileId) {
    const requestOptions = {
        method: 'GET',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'access_token': localStorage.getItem('access_token')}
    };

    return fetch(`/api/profile/${profileId}`, requestOptions)
            .then(response => response.json())
            .then(profiles => {
                return profiles;
            });
}
function addProfile(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data', 'access_token': localStorage.getItem('access_token')},
        body: JSON.stringify(formData)
    };

    return fetch(`/api/addProfile`, requestOptions)
            .then(response => response.json())
            .then(profiles => {
                return profiles;
            });
}
function uploadImage(formData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data', 'access_token': localStorage.getItem('access_token')},
        body: formData
    };

    return fetch(`/uploadImage?type=logo`, requestOptions)
            .then(response => response.json())
            .then(profiles => {
                return profiles;
            });
}
function editProfile(formData, profileId) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data', 'access_token': localStorage.getItem('access_token')},
         body: JSON.stringify(formData)
    };

    return fetch(`${config.API_PATH}/editprofile/${profileId}`, requestOptions)
            .then(response => response.json())
            .then(resp => {
                return resp;
            });
}
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.setItem('token_valid', false);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
//        headers: authHeader()
    };

    return fetch(`/api/users`, requestOptions).then(response => response.json());
}
