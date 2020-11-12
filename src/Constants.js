import useSwr from 'swr'

const baseUrl = 'https://intense-refuge-49089.herokuapp.com';
const likePath = '/api/matches/create-matches';

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
    fetch(baseUrl + likePath, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(likeEvent)
    })
        .then(response => response.json())
        .catch(err => console.error(err))
};

export const sendMessage = (userId, memberId, message) => {
    const likeEvent = {fkProfileId: userId, fkDreamProfileId: memberId, messageToDreamProfile: message};
    fetch(baseUrl + likePath, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(likeEvent)
    })
        .then(response => response.json())
        .catch(err => console.error("error", err))
};


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

export default Relationships



