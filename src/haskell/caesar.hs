import Data.Char

create_char_binder :: Integral a => a -> a -> a
create_char_binder num_letters code
  | code >= 0 = code `mod` num_letters
  | otherwise = code + num_letters

rotate_letter :: (Int -> Int) -> Int -> Char -> Char
rotate_letter char_binder rotation char
  | isUpper char = rotator 'A'
  | isLower char = rotator 'a'
  | otherwise = char
  where rotator an_a = chr $ char_binder (ord char + rotation - (ord an_a)) + (ord an_a)

caesar :: Int -> Int -> [Char] -> [Char]
caesar num_letters rotation = map $ rotate_letter (create_char_binder num_letters) rotation
