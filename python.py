def calculator():
    print("Welcome to the calculator program")
    print("Please enter the first number")
    num1 = int(input())
    print("Please enter the second number")
    num2 = int(input())
    print("Please enter the operation you would like to perform")
    operation = input()
    if operation == "+":
        print(num1 + num2)
    elif operation == "-":
        print(num1 - num2)
    elif operation == "*":
        print(num1 * num2)
    elif operation == "/":
        print(num1 / num2)
    else:
        print("Invalid operation")
    print("Would you like to perform another calculation? (Y/N)")
    answer = input()
    if answer == "Y":
        calculator()
    else:
        print("Thank you for using the calculator program")
        exit()
    
calculator()