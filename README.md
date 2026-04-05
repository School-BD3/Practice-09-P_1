Практична робота 9: Замикання

Дисципліна: Основи програмування мовою JavaScript
Тема: Замикання - лексична область видимості, паттерни, мемоізація

Мета роботи:
Опанувати замикання в JavaScript: створення приватних змінних, module pattern, мемоізація, каррінг, функціональні паттерни.

Counter Factory

Реалізовані лічильники через замикання:

1.1. createCounter(initial)
Приклад використання:
const counter = createCounter(5);
counter.increment();
counter.decrement();
counter.get();
counter.reset();

Приватна змінна count недоступна ззовні
Методи: increment, decrement, get, reset

1.2. createLimitedCounter(min, max, initial)
Приклад використання:
const limited = createLimitedCounter(0, 3);
limited.increment();
limited.increment();
limited.increment();
limited.increment();

Лічильник не виходить за межі [min, max]

1.3. createStepCounter(step, initial)
Приклад використання:
const stepCounter = createStepCounter(2, 0);
stepCounter.increment();
stepCounter.increment();
stepCounter.decrement();

Лічильник змінюється з кроком step

Memoization

2.1. memoize(fn)
Приклад використання:
const fibMemo = memoize(fibonacci);
fibMemo(40); // кешує результат

Кешує результати функції за аргументами
Повторний виклик з тим же аргументом виконується миттєво

2.2. memoizeExpiring(fn, ttlMs)
Приклад використання:
const memoTTL = memoizeExpiring(fibonacci, 5000);
memoTTL(40); // результат кешу дійсний протягом 5 секунд

Кеш з обмеженим часом життя (TTL)

Fibonacci Benchmark

Вивід у консолі:
=== Fibonacci Benchmark ===
102334155
fibonacci(40) без мемоізації: 1.133s
102334155
memoized 2nd call: 0.001s

Демонструє ефект кешування при повторних викликах

Приклади використання всіх лічильників

Вивід у консолі:
6
5
5
5
1
2
3
3
2
4
2

Висновки

Замикання забезпечують інкапсуляцію стану
Приватні змінні недоступні ззовні
Memoization значно підвищує швидкість повторних викликів
Код реалізує усі вимоги: Counter Factory + Memoization + Fibonacci benchmark
