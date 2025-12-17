import http from 'k6/http'
import { sleep } from 'k6'
import { check } from 'k6';
import { getBaseUrl } from '../utils/variables.js';    
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export const options = {

    stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '10s', target: 30},
        { duration: '20s', target: 30},
        { duration: '20s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'], // 95% of requests should be below 200ms
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    },
};

// TEST starts here
export default function () {

    const url = getBaseUrl() + '/login'
    const payload = JSON.stringify(postLogin);
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // validate if login is working
    const response = http.post(url, payload, params);
    check(response, {
        'Validating login status is 200': (r) => r.status === 200,
        'Validating response contains token': (r) => typeof (r.json().token) == 'string'
    });

    sleep(1)
}
