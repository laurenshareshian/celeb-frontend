import useSwr from 'swr'

export const baseUrl = 'https://intense-refuge-49089.herokuapp.com';
//export const baseUrl = 'http://localhost:8080';
const likePath = '/api/matches/create-matches';
const dislikePath = '/api/matches/unlike';
const registerAccountPath = '/api/login/create-logins';
const sendMessagePath = '/api/matches/send-message';

export const useRequest = (path, identifier) => {
    if (!path) {
        throw new Error('Path is required');
    }

    const url = identifier ? baseUrl + path + '/' + identifier : baseUrl + path;
    console.log("url", url);
    const {data, error} = useSwr(url);
    console.log("{data, error}", {data, error});
    return {data, error};
};

export const setLike = (userId, memberId) => {
    const likeEvent = {fkProfileId: userId, fkDreamProfileId: memberId, messageToDreamProfile: null};
    return fetch(baseUrl + likePath, postBody(likeEvent))
        .catch(err => console.error(err))
};

export const setDislike = (userId, memberId) => {
    const identifiers = "/" + userId + "/" + memberId;
    return fetch(baseUrl + dislikePath + identifiers, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
        .then(resp => {
            console.log("delete resp: ", resp);
        })
        .catch(err => console.error(err))
};

export const sendMessage = (userId, memberId, message) => {
    console.log("SENDING");
    const identifiers = "/" + userId + "/" + memberId + "/" + message;
    return fetch(baseUrl + sendMessagePath + identifiers, {
        method: 'Put',
        headers: {'Content-Type': 'application/json'}
    })
        .then(resp => {
            console.log("edit resp: ", resp);
        })
        .catch(err => console.error(err))
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
    console.log("Posting to: ", baseUrl + "/api/profile/create-profiles")
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



