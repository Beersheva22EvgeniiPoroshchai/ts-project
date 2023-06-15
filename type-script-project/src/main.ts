import Rectangle from "./Rectangle";

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

let comparator: (num1: number, num2: number) => number;
comparator = function(str: number, num: number): number {
return str - num;
}

type Comparator<T=number | number> = (p1: T, p2: T) => number;
let comp: Comparator = 
function(num1: number, num2: number) {
    return num1 > num2 ? 1: -1;
}

type Person = {id: number, date: Date | string, name: string, gender?: 'male' | 'female'};
function displayPerson (prs: Person): void {
    console.log(prs.gender?.substring(1));
    
}

displayPerson({id: 123, date: "12-02-2000", name: 'vova', gender: "male"});
 

function cipher (text: string, key: number): string {
    //TODO
    //cipher('yz', 6) => " !"   code ASCII
    
    return '';
}

function decipher (text: string, key: number): string {
    //TODO
    //cipher(' !', 6) => "yz"   code ASCII

    return '';
}


const shape: Rectangle = new Rectangle (3,4);
let width = shape.width;
