function getGender(nameEmpl) {
    let firstName = nameEmpl.split(" "); 
    console.log(firstName[0].at(-1));
    return firstName[0].at(-1) == 'a' ? 'female' : 'male';
    }


console.log(getGender("Marirrrr Lev"));