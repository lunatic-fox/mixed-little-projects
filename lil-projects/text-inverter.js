/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */

/**
 * Reverses a string.
 * @param {string} x Some string to be converted.
 */
const reversed = x => x.split('').reverse().join('');

// In use
const text = 'Hello world!';
console.log(reversed(text)); //Expected output: !dlrow olleH