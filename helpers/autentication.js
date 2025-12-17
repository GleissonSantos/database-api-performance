import http from 'k6/http';
import { getBaseUrl } from '../utils/variables.js';    
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export function getAuthToken() {

    const url = getBaseUrl() + '/login'

        const payload = JSON.stringify(postLogin);

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        // validate if login is working
        const response = http.post(url, payload, params);
        return response.json('token');

}