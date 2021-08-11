--- @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
--- @copyright Josélio de S. C. Júnior 2021

--- Reverses a string.
---@param x string Some string to be converted.
local function reversed(x) return string.reverse(x) end

-- In use
local text = 'Hello world!';
print(reversed(text)); -- Expected output: !dlrow olleH