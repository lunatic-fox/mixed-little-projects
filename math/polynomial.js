/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*//**/

const x = 7;

/* Regular way */
console.log(x ** 7 - 4 * x ** 6 - 20 * x ** 5 - 9 * x ** 4 + 17 * x ** 3 - 25 * x ** 2 + 33 * x + 62);

/* Briot-Ruffini */
let q = 0;
const P = +`1 -4 -20 -9 17 -25 33 62`
    .split(' ')
    .map(e => +e)
    .map((e, i, a) => {
        q = i === 0 ? x * e : x * q;
        q = q + a[i + 1];
        return q;
    })
    .slice(-2, -1);

console.log(P);
