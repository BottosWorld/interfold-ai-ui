import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/clos`;
const cloSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('clo')));

export const cloService = {
    clo: cloSubject.asObservable(),
    get cloValue () { return cloSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
        .then(clo => {
            // publish clo to subscribers and store in local storage to stay logged in between page refreshes
            cloSubject.next(clo);
            localStorage.setItem('clo', JSON.stringify(clo));

            return clo;
        });
}

function logout() {
    // remove clo from local storage, publish null to clo subscribers and redirect to login page
    localStorage.removeItem('clo');
    cloSubject.next(null);
    Router.push('/account/login');
}

function register(clo) {
    return fetchWrapper.post(`${baseUrl}/register`, clo);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored clo if the logged in clo updated their own record
            if (id === cloSubject.value.id) {
                // update local storage
                const clo = { ...cloSubject.value, ...params };
                localStorage.setItem('clo', JSON.stringify(clo));

                // publish updated clo to subscribers
                cloSubject.next(clo);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}