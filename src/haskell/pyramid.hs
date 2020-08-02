row :: Integer -> String
row x = if x > 1
  then "*" ++ (row (x-1))
  else "*"

pyramid :: Integer -> String
pyramid x = if x > 1
  then (pyramid (x-1)) ++ "\n" ++ (row x)
  else "*"

fizzbuzz :: Integer -> String
fizzbuzz n
  | (mod n 15) == 0 = "fizzbuzz"
  | (mod n 5) == 0  = "buzz"
  | (mod n 3) == 0  = "fizz"
  | otherwise       = show n

play_fizzbuzz :: Integer -> [String]
play_fizzbuzz n = [fizzbuzz x | x <- [1..n]]

say_hello :: Maybe String -> String
say_hello (Just s) = "Hello, " ++ s ++ "!\n"
say_hello Nothing = "Hello, World!"
