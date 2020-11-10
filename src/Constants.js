import useSwr from 'swr'

const baseUrl = 'https://intense-refuge-49089.herokuapp.com';

export const useRequest = (path, identifier) => {
    if (!path) {
        throw new Error('Path is required');
    }

    const url = identifier ? baseUrl + path + '/' + identifier : baseUrl + path;
    console.log("url", url);
    const { data, error } = useSwr(url);
    return { data, error };
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



