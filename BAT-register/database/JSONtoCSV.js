/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
 * @license MIT
 *//***/
const fs = require('fs');
const plan = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

const tab = [
    ['Date', 'Hour', ...new Set(...Object.values(plan).map(e => Object.keys(e)))],
    ...Object.entries(plan).map(e => [
        ...e[0].split(e[0].match(/(?<=(\d{2}\/){2}\d{4}).*?(?=(\d{2}\:){2}\d{2})/g)),
        ...Object.values(e[1])
    ])
];

const csv = tab.map(e => e.join(';')).join(';\n');
fs.writeFileSync('./db.csv', csv);