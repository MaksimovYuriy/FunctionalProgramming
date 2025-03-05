let add x y = x + y

let subtract x y = x - y

let multiply x y = x * y

let divide x y =
    if y <> 0.0 then
        x / y
    else
        failwith "Деление на ноль!"

let rec factorial n =
    match n with
    | 0 -> 1
    | _ when n > 0 -> n * factorial (n - 1)
    | _ -> failwith "Факториал определен только для неотрицательных целых чисел."

let addFive = add 5
let multiplyByTwo = multiply 2

// Тестовые примеры
printfn "%d" (add 3 7)          // Выводит 10
printfn "%d" (subtract 5 3)    // Выводит 2
printfn "%d" (multiply 10 10)     // Выводит 100
printfn "%A" (divide 120.0 50)      // Выводит 2.4
printfn "%d" (factorial 7)      // Выводит 5040
printfn "%d" (addFive 10)        // Выводит 15
printfn "%d" (multiplyByTwo 15)  // Выводит 30