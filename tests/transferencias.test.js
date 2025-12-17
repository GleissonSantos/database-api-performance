import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { getBaseUrl } from '../utils/variables.js';    
import { getAuthToken } from '../helpers/autentication.js';


export const options = {
  iterations: 1,
};

export default function () {

  const token = getAuthToken();
  console.log('Token obtido:', token);

  const url = getBaseUrl() + '/transferencias'
  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 11,
    token: ""
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  let res = http.post(url, payload, params);
  
  console.log('Status da resposta:', res.status);
  console.log('Body da resposta:', res.body);

  check(res, {
    'Validating login status is 201': (r) => r.status === 201
  });

  sleep(1);
}
