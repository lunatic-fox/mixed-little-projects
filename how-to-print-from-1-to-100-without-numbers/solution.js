/**
 *************************************************
 *
 *  Challenge: Print from 1 to 100 without using
 *  numbers in your code.
 * 
 *************************************************
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/

// Solution
Array.from(Array(+`${'' ** ''}${+''}${+''}`), (_, i) => console.log(++i));