/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
 *//***/
/**
 * Colorizes the text.
 * @param {string} str The text to colorize.
 * @param {number} r red - a number from 0 to 255.
 * @param {number} g green - a number from 0 to 255.
 * @param {number} b blue - a number from 0 to 255.
 * @returns {string}
 */
const rgb = (str, r, g, b) => `\u001b[38;2;${r};${g};${b}m${str}\u001b[0m`;


const [yellow, orange, green, cyan, violet] = [
    /** @param {string} s */
    s => rgb(s, 255, 255, 0),
    /** @param {string} s */
    s => rgb(s, 255, 89, 0),
    /** @param {string} s */
    s => rgb(s, 92, 235, 52),
    /** @param {string} s */
    s => rgb(s, 52, 235, 232),
    /** @param {string} s */
   s => rgb(s, 201, 135, 255)
];


module.exports = { yellow, orange, green, cyan, violet };