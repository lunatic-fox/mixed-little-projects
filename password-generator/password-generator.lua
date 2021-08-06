--- For best experience run this program in VS Code.
--- author: Josélio de S. C. Júnior <joseliojrx25@gmail.com>
--- copyright: Josélio de S. C. Júnior - 2021

local e = string.char(27)
local greet = e..'[38;2;255;255;255m'..e..'[48;2;0;152;170m'
local log = e..'[38;2;0;0;0m'..e..'[48;2;255;255;255m'
local alert = e..'[38;2;255;0;0m'..e..'[48;2;255;255;0m'..e..'[1m'
local valid = e..'[38;2;0;0;0m'..e..'[48;2;0;255;0m'..e..'[1m'
local reset = e..'[0m'

local alpha = {} for i = 0, 93, 1 do table.insert(alpha, string.char(33 + i)) end

print(greet.."  Password Generator - by Jos"..string.char(130).."lio J"..string.char(163).."nior  \n  Type 'quit' to end this program.  "..reset);
local function main()
    print('\n'..log.." What's the length of your password? (6 - 30) "..reset)
    io.write('> ')
    local x = io.read()

    if x == 'quit' then return io.close() end

    x = tonumber(x) or 0
    if x >= 6 and x <= 30 then
        local password = {}
        for _ in ipairs(alpha) do table.insert(password, alpha[math.random(#alpha)]) end
        password = table.concat(password,'' , 1, x)
        print("Here's your password!\n"..valid..'  '..password..'  '..reset)
    else
        print('\n'..alert..' Your password length must be a number between 6 to 30 characters. '..reset)
        main()
    end
end
main()