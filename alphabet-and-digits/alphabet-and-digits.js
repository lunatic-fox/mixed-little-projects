/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/

// Upper case alphabet array.
const alphabetUpperCase = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));

// Output:
// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


// Lower case alphabet array.
const alphabetLowerCase = Array.from(Array(26), (_, i) => String.fromCharCode(97 + i));

// Output:
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// Digits from 0 to 9.
const digits = Array.from(Array(10), (_, i) => i);

// Output:
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]