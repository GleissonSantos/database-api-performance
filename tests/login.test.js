import http from 'k6/http'
import { sleep } from 'k6'
import { check } from 'k6';


export const options = {

    iterations: 20,
    thresholds: {
        http_req_duration: ['p(90)<10','max<10'], // 95% of requests should be below 200ms
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    },
};

// TEST starts here
export default function () {

    const url = 'http://localhost:3000/login'
    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456',
    });

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
