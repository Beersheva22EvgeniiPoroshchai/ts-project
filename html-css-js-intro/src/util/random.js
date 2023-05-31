const names =  {
    "maleNames": ["Ricky", "Joe", "John", "Simon", "Brad", "Paul", "Pedro", "Rohn", "Tom", "Shawn"],
    "femaleNames": ["Branda", "Lucy", "Rachel", "Elizabeth", "Luiza", "Maria", "Tracy", "Patricia", "Peneloppa", "Ester"]
};

export function getRandomInt(min, max) {
    if(min == max) {
        max++;
    } else if (min > max) {
        [min, max] = [max, min]
    }
    return Math.trunc(min + Math.random() * (max - min))

}
export function getRandomElement(array) {
    return array[getRandomInt(0, array.length)]
}
export function getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) {
   const gender = getRandomElement(['male', 'female']);
   const name = getRandomElement(gender == 'female' ? names.femaleNames :
    names.maleNames);
    const birthYear = getRandomInt(minYear, maxYear + 1);
    const salary = getRandomInt(minSalary, maxSalary) * 1000;
    const department = getRandomElement(departments);
    return {
         name, birthYear, gender,
        salary, department};
}

// return {id: getRandomInt(100000, 1000000), name: nameEmpl, gender: getGender(nameEmpl), birthYear: getRandomInt(1960, 2000),
//     salary: getRandomInt(5000, 15000), department: getDepartment()}
// }

// function getRandomName() {
//     const firstName = ["Kai", "Eliana", "Jaden", "Ezra", "Luca", "Rowan", "Nova", "Amara", "Aaliyah", "Finn"];
//     const lastName= ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson"];
//     let randFirst = Math.floor(Math.random() * firstName.length); 
//     let randLast = Math.floor(Math.random() * lastName.length); 
//     return firstName[randFirst] + " " + lastName[randLast];
// } 

// function getDepartment() {
// const deps = ['QA', 'Developers', 'Lawyers', 'HR',  'Accounting', 'Service', 'Managment']
// let randDep = Math.floor(Math.random() * deps.length); 
// return deps[randDep];
// }

// function getGender(nameEmpl) {
//     let firstName = nameEmpl.split(" "); 
//     console.log(firstName[0].slice(-1));
//     return firstName[0].slice(-1) == 'a' ? 'female' : 'male';
//     }

