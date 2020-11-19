import useSwr from 'swr'

export const baseUrl = 'https://intense-refuge-49089.herokuapp.com';
//export const baseUrl = 'http://localhost:8080';
const likePath = '/api/matches/create-matches';
const registerAccountPath = '/api/login/create-logins';

export const useRequest = (path, identifier) => {
    if (!path) {
        throw new Error('Path is required');
    }

    const url = identifier ? baseUrl + path + '/' + identifier : baseUrl + path;
    console.log("url", url);
    const {data, error} = useSwr(url);
    return {data, error};
};

export const likes = (userId, memberId) => {
    const likeEvent = {fkProfileId: userId, fkDreamProfileId: memberId, messageToDreamProfile: null};
    return fetch(baseUrl + likePath, postBody(likeEvent))
        .then(response => response.json())
        .catch(err => console.error(err))
};

export const sendMessage = (userId, memberId, message) => {
    const likeEvent = {fkProfileId: userId, fkDreamProfileId: memberId, messageToDreamProfile: message};
    console.log("Sending in Constants.sendMessage: ", JSON.stringify(likeEvent));
    return fetch(baseUrl + likePath,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(likeEvent)
    })
        //.then(resp => resp.json())
        .then(response => {
            console.log("send response", response);
            return response;
        })
        .catch(err => console.error("error", err))
};

export const registerAccount = (email, password) => {
    return fetch(baseUrl + registerAccountPath,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(err => console.error("error", err))
}

export const newUser = (newUserData) => {
    return fetch(baseUrl + "/api/profile/create-profiles", postBody(newUserData))
        .then(resp => {
            console.log("response: ", resp);
            return resp.json();
        })
        .catch(err => console.error(err))
}

export const newPreferences = (newPreferencesData) => {

    return fetch(baseUrl + "/api/preferences/create-preferences", postBody(newPreferencesData))
        .then(resp => {
            console.log("response: ", resp);
            return resp.json();
        })
        .catch(err => console.error(err))
}

export const Relationships = {
    COMPATIBLES: {
        NAME: 'Compatibles',
        PATH: '/api/profile/get-compatibles'
    },
    ADMIRERS: {
        NAME: 'Admirers',
        PATH: '/api/profile/get-admirers'
    },
    MATCHES: {
        NAME: 'Matches',
        PATH: '/api/profile/get-matches'
    }
};

const postBody = (object) => {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(object)
    }
};

export default Relationships



