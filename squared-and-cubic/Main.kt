/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/

import kotlin.math.pow

fun main() {
    val r = readLine()!!.toInt()
    for (i in 1..r) {
        val j = i.toDouble()
        println("$i ${j.pow(2.0).toInt()} ${j.pow(3.0).toInt()}")
    }
}