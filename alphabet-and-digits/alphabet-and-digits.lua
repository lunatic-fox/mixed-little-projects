--- author: Josélio de S. C. Júnior <joseliojrx25@gmail.com>
--- copyright: Josélio de S. C. Júnior - 2021

-- Upper case alphabet array.
local alphabetUpperCase = {} for i = 0, 25, 1 do table.insert(alphabetUpperCase, string.char(65 + i)) end

-- Output when unpacked:
-- A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z


-- Lower case alphabet array.
local alphabetLowerCase = {} for i = 0, 25, 1 do table.insert(alphabetLowerCase, string.char(97 + i)) end

-- Output when unpacked:
-- a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z


-- Digits from 0 to 9.
local digits = {} for i = 0, 9, 1 do table.insert(digits, i) end

-- Output when unpacked:
-- 0  1  2  3  4  5  6  7  8  9