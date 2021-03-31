const fetch = require('node-fetch');

let url = 'https://api.watchmode.com/v1/title/1247225/details/?apiKey=eEMG2gaj5c051KeUhMXr4UHm7Iv1hQBZGj8ip5d4';

fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    });