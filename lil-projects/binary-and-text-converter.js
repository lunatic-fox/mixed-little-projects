/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */

/**
 * Converts text to binary.
 * @param {string} v Some text string to be converted.
 */
const textToBinary = v => v.split('').map(x => x.codePointAt().toString(2)).join(' ');

/**
* Converts binary to text.
* @param {string} v Some binary string to be converted.
*/
const binaryToText = v => v.split(' ').map(x => String.fromCharCode(parseInt(x, 2))).join('');

// In use
const text = 'Hello world!';
const toB = textToBinary(text);
const toS = binaryToText(toB);

console.log(toB); // Expected output: 1001000 1100101 1101100 1101100 1101111 100000 1110111 1101111 1110010 1101100 1100100 100001
console.log(toS); // Expected output: Hello world!