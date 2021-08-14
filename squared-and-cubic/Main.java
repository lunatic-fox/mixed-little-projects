/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior - 2021
*/

import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws IOException {

        Scanner r = new Scanner(System.in);
        int value = r.nextInt();
        r.close();

        for (int i = 1; i <= value; i++) {
            System.out.println(i + " " + (int) Math.pow(i, 2) + " " + (int) Math.pow(i, 3));
        }

    }
}