import  React from "react";

let key = localStorage.getItem('key');

// this return a Promise
export const myFetcher = (url, body, method='GET') => {
    return fetch(`https://financemeapi.com/api/` + url, {
        'headers':
        {
            method: method,
            body: body,
            'Authorization': 'Bearer ' + key,
        }
    }, []).then(res => res.json());
};
