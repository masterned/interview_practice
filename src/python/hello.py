def tc(cost, percent):
    tip = cost * (percent / 100.0)
    total = cost + tip
    return total


def f2c(f):
    celsius = (f-32) * 5.0 / 9.0
    return celsius


def age(your_age):
    my_age = 23
    if your_age == my_age:
        return "We're the same age!"
    elif your_age > my_age:
        return "You're older than me!"
    else:
        return "You're younger than me!"


def fun(num):
    if num == 1:
        return tc(25.0, 20.0)
    elif num == 2:
        return f2c(80)
    elif num == 3:
        return age(23)
    else:
        return "I don't know what you want"


def factorial(n):
    if n < 0:
        return "ERROR"
    if n == 0:
        return 1
    else:
        return factorial(n-1) * n


def sayYeah():
    print("Yeah")
    sayYeah()


print(factorial(20))
