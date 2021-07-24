/**
 * For best experience run this program in VS Code.
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/
const io = require('readline').createInterface({
    input: process.stdin, output: process.stdout
});

const e = String.fromCharCode(27),
greet = `${e}[38;2;255;255;255m${e}[48;2;0;152;170m`,
log = `${e}[38;2;0;0;0m${e}[48;2;255;255;255m`,
alert = `${e}[38;2;255;0;0m${e}[48;2;255;255;0m${e}[1m`,
valid = `${e}[38;2;0;0;0m${e}[48;2;0;255;0m${e}[1m`,
reset = `${e}[0m`;

const alpha = Array.from(Array(94), (_, i) => String.fromCharCode(33 + i));

console.log(`${greet}  Password Generator - by Josélio Júnior \n  Type 'quit' to end this program.  ${reset}`);
(function main() {
    io.question(`\n${log} What's the length of your password? (6 - 30) ${reset}\n> `, x => {
        
        if (x === 'quit') return io.close();

        x = +(x.replace(/\s+/g, ''));
        if (x >= 6 && x <= 30) {
            const password = y => Array.from(Array(y), (_, i) => alpha.sort(() => Math.random() - 0.5)[i]);
            console.log(`Here's your password!\n${valid}  ${password(x).join('')}  ${reset}`);
            io.close();
        } else {
            console.log(`\n${alert} Your password length must be a number between 6 to 30 characters. ${reset}`);
            main();
        }
    });
})();