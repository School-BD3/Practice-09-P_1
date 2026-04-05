// COUNTER FACTORY

function createCounter(initial = 0) {
  let count = initial;

  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
    reset: () => { count = initial; return count; }
  };
}

function createLimitedCounter(min, max, initial = min) {
  let count = initial;

  return {
    increment: () => { if (count < max) count++; return count; },
    decrement: () => { if (count > min) count--; return count; },
    get: () => count,
    reset: () => { count = initial; return count; }
  };
}

function createStepCounter(step = 1, initial = 0) {
  let count = initial;

  return {
    increment: () => { count += step; return count; },
    decrement: () => { count -= step; return count; },
    get: () => count,
    reset: () => { count = initial; return count; }
  };
}

// MEMOIZATION

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function memoizeExpiring(fn, ttlMs) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    const now = Date.now();
    if (cache.has(key)) {
      const { result, expires } = cache.get(key);
      if (now < expires) return result;
    }
    const result = fn(...args);
    cache.set(key, { result, expires: now + ttlMs });
    return result;
  };
}

// EXAMPLE: FIBONACCI

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibMemo = memoize(fibonacci);

console.log("=== Fibonacci Benchmark ===");
console.time("fibonacci(40) без мемоізації");
console.log(fibonacci(40));
console.timeEnd("fibonacci(40) без мемоізації");

console.time("memoized 2nd call");
console.log(fibMemo(40));
console.timeEnd("memoized 2nd call");

// EXAMPLES USAGE

console.log("\n=== Counter Examples ===");
const counter1 = createCounter(5);
console.log(counter1.increment());
console.log(counter1.decrement());
console.log(counter1.get());      
console.log(counter1.reset());    

const limited = createLimitedCounter(0, 3);
console.log(limited.increment());
console.log(limited.increment());
console.log(limited.increment());
console.log(limited.increment());

const stepCounter = createStepCounter(2, 0);
console.log(stepCounter.increment());
console.log(stepCounter.increment());
console.log(stepCounter.decrement());