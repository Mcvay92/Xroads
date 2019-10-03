import config from '../config';
export const userService = {
    signUp,
    signIn,
    getAllProfiles,
    getAllUsersProfiles,
    getProfile,
    editProfile,
    getAll,
    addProfile,
    deleteSingleProfile,
    logout
};

function signUp(formData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    return fetch(`/api/signup`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.data) {
                localStorage.setItem('user', JSON.stringify(data.data));
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('token_valid', true);
            }
            return data;
        }).catch(error => {
            return error;
        });
}
function signIn(formData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
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
        headers: { 'Accept': 'application/json', 'access_token': accessToken }
    };

    return fetch(`${config.API_PATH}/allProfiles`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.token == 'invalid') {
                localStorage.setItem('token_valid', false);
            }
            return data;
        })
}
function getProfile(profileId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'access_token': localStorage.getItem('access_token') }
    };

    return fetch(`/api/profile/${profileId}`, requestOptions)
        .then(response => response.json())
        .then(profiles => {
            console.log(profiles)
            if (profiles.token == 'invalid') {
                localStorage.setItem('token_valid', false);
            }
            return profiles;
        }).catch(error => console.log('error', error));
}
function addProfile(formData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'access_token': localStorage.getItem('access_token') },
        body: formData
    };

    return fetch(`/api/addProfile`, requestOptions)
        .then(response => response.json())
        .then(profiles => {
            if (profiles.token == 'invalid') {
                localStorage.setItem('token_valid', false);
            }
            return profiles;
        });
}

function editProfile(formData, profileId) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'access_token': localStorage.getItem('access_token') },
        body: formData
    };

    return fetch(`${config.API_PATH}/editprofile/${profileId}`, requestOptions)
        .then(response => response.json())
        .then(resp => {
            if (resp.token == 'invalid') {
                localStorage.setItem('token_valid', false);
            }
            return resp;
        });
}
function deleteSingleProfile(profileId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'access_token': localStorage.getItem('access_token') },
    };

    return fetch(`${config.API_PATH}/deleteprofile/${profileId}`, requestOptions)
        .then(response => response.json())
        .then(resp => {
            if (resp.token == 'invalid') {
                localStorage.setItem('token_valid', false);
            }
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


function getAllUsersProfiles() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    };

    return fetch(`${config.API_PATH}/getAllProfiles`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data;
        })
}


// http://localhost:3001/api/getAllProfiles