import Data.List

data Possibility = Possible | Impossible
  deriving (Show)

toPossibility :: Bool -> Possibility
toPossibility True = Possible
toPossibility False = Impossible

isBeautiful :: Eq a => [a] -> Bool
isBeautiful = any ((>= 2) . length) . group

missingOnes :: [a] -> [[a]]
missingOnes list = [(take i list) ++ (drop (i + 1) list) | i <- [0..((length list) - 1)]]

couldBeBeautiful :: Eq a => [a] -> Possibility
couldBeBeautiful list = toPossibility (any isBeautiful (missingOnes list))
