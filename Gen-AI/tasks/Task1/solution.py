def unique(numbers):
    result = 0
    for num in numbers:
        result ^= num
    return result


numbers = [4, 1, 2, 1, 2]
print(unique(numbers))
