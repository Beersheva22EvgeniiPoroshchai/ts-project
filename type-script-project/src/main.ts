let n = 10;
n = 20;
let num: string = '12';

let num1: number | "abc" = 12;
num1 = 100;
num1 = 'abc'

const ar: string[] = [];   //create array
ar.push('2');
console.log(ar.length);

const ar1: [string?, number?] = [undefined, undefined];   //yes or no
ar1[1] = 6;
console.log(ar1);

const ar2: Array<string> = [];   //create array

const map1: Map<string, number> = new Map([['abc', 40]]);
console.log(map1.get('abc'));
console.log(map1.entries());
Array.from(map1.entries()).forEach(e => console.log(`${e[0]} -> ${e[1]}`));

function f(a: string | number): number {
    return typeof a == 'number' ? a * 2: +(a);
}

console.log(f(5));





