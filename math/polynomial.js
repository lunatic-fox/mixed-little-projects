/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*//**/

/* Regular way */
const x1 = 7;
console.log(x1 ** 7 - 4 * x1 ** 6 - 20 * x1 ** 5 - 9 * x1 ** 4 + 17 * x1 ** 3 - 25 * x1 ** 2 + 33 * x1 + 62);

/* Briot-Ruffini */
let q = 0;
const x2 = 7;
const P = +`1 -4 -20 -9 17 -25 33 62`
    .split(' ')
    .map(e => +e)
    .map((e, i, a) => {
        q = i === 0 ? x2 * e : x2 * q;
        q = q + a[i + 1];
        return q;
    })
    .slice(-2, -1);

console.log(P);