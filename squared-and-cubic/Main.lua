--- author: Josélio de S. C. Júnior <joseliojrx25@gmail.com>
--- copyright: Josélio de S. C. Júnior - 2021

local r = tonumber(io.read())

for i = 1, r, 1 do
    print(i..' '..math.floor(i ^ 2)..' '..math.floor(i ^ 3))
end