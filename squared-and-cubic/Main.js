/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/

const io = require('readline').createInterface({
    input: process.stdin, output: process.stdout
});

io.question('', r => {

    for (i = 1; i <= +r; i++) {
        console.log(`${i} ${i ** 2} ${i ** 3}`);
    }

    io.close();
});