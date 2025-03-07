open System

type Operation =
    | Add
    | Subtract
    | Multiply
    | Divide
    | Power
    | Sqrt
    | Sin
    | Cos
    | Tan

let degrees_to_radians (degrees: float) : float = degrees * Math.PI / 180.0

let normalize_zero (x: float) =
    if abs x < 1e-10 then 0.0  // Если число очень близко к нулю, заменяем его на 0.0
    else x

let add (x: float) (y: float) = x + y
let subtract (x: float) (y: float) = x - y
let multiply (x: float) (y: float) = x * y
let divide (x: float) (y: float) = if y <> 0 then Some (x / y) else None
let power (x: float) (y: float) = Math.Pow(x, y)
let sqrt (x: float) = if x >= 0.0 then Some (Math.Sqrt(x)) else None
let sin (x: float) = Math.Sin(x)
let cos (x: float) = Math.Cos(x)
let tan (x: float) =
    // Проверяем, что угол не является нечетным кратным π/2
    if (x % (Math.PI / 2.0)) = 0.0 && (x % Math.PI <> 0.0) then
        None // Тангенс не существует для этих углов
    else
        Some (normalize_zero (Math.Tan(x))) // Тангенс существует для этого угла



let perform_operation operation (x: float) (y: float) : float = 
    match operation with
    | Add -> add x y
    | Subtract -> subtract x y
    | Multiply -> multiply x y
    | Divide ->
        match divide x y with
        | Some result -> result
        | None -> failwith "Нельзя делить на ноль! 0_о"
    | Power -> power x y
    | _ -> failwith "Операция с одним аргументом!"

let perform_unary_operation operation x =
    match operation with
    | Sqrt -> 
        match sqrt x with
        | Some result -> result
        | None -> failwith "Ошибка: Невозможно вычислить квадратный корень для отрицательного числа."
    | Sin -> sin (degrees_to_radians x)
    | Cos -> cos (degrees_to_radians x)
    | Tan -> 
        match tan (degrees_to_radians x) with
        | Some result -> result
        | None -> failwith "От этого угла тангенс взять невозможно!"
    | _ -> failwith "Некорректная операция"

let printMenu () =
    printfn "Выберите операцию:"
    printfn "1. Сложение"
    printfn "2. Вычитание"
    printfn "3. Умножение"
    printfn "4. Деление"
    printfn "5. Возведение в степень"
    printfn "6. Квадратный корень"
    printfn "7. Синус"
    printfn "8. Косинус"
    printfn "9. Тангенс"

let readNumber prompt =
    printfn "%s" prompt
    match Double.TryParse(Console.ReadLine()) with
    | (true, number) -> number
    | _ -> failwith "Ошибка: Введите правильное число."

let rec calculator () =
    printMenu ()
    match Console.ReadLine() with
    | "1" -> 
        let x = readNumber "Введите первое число:"
        let y = readNumber "Введите второе число:"
        printfn "Результат: %f" (perform_operation Add x y)
    | "2" -> 
        let x = readNumber "Введите первое число:"
        let y = readNumber "Введите второе число:"
        printfn "Результат: %f" (perform_operation Subtract x y)
    | "3" -> 
        let x = readNumber "Введите первое число:"
        let y = readNumber "Введите второе число:"
        printfn "Результат: %f" (perform_operation Multiply x y)
    | "4" -> 
        let x = readNumber "Введите первое число:"
        let y = readNumber "Введите второе число:"
        try
            printfn "Результат: %f" (perform_operation Divide x y)
        with
        | :? System.Exception as ex -> printfn "%s" ex.Message
    | "5" -> 
        let x = readNumber "Введите основание:"
        let y = readNumber "Введите экспоненту:"
        printfn "Результат: %f" (perform_operation Power x y)
    | "6" -> 
        let x = readNumber "Введите число для вычисления квадратного корня:"
        try
            printfn "Результат: %f" (perform_unary_operation Sqrt x)
        with
        | :? System.Exception as ex -> printfn "%s" ex.Message
    | "7" -> 
        let x = readNumber "Введите угол (в градусах):"
        printfn "Результат: %f" (perform_unary_operation Sin x)
    | "8" -> 
        let x = readNumber "Введите угол (в градусах):"
        printfn "Результат: %f" (perform_unary_operation Cos x)
    | "9" -> 
        let x = readNumber "Введите угол (в градусах):"
        try
            printfn "Результат: %f" (perform_unary_operation Tan x)
        with
        | :? System.Exception as ex -> printfn "%s" ex.Message
    | _ -> printfn "Неверная команда!"
    
    printf "------------------------------------------------------\n"
    calculator ()

calculator ()