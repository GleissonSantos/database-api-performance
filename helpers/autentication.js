import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export function getAuthToken() {

    const url = 'http://localhost:3000/login'

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