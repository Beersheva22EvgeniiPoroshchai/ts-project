const imgs = [
    {title: 'lexus', model: 'lx450'},
    {title: 'bmw', model: 'm5'},
    {title: 'audi', model: 'rs8'}
];

function getCar() {
    setTimeout(() => {
       let output='';
        imgs.forEach((car, index) => {
            output += `<p style="font-size: 20px">${[index+1] + '. ' + car.title + " " + car.model}</p>`;
        });
        document.body.innerHTML = output;
    }, 200);
}

function createCar (car) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            imgs.push(car);

            const error = false;

            if (!error) {
                resolve(); 
             } else {
                reject ('Something went wrong!')
            }
            }, 100);
        });
}

createCar({title: 'tesla', model: 'model X'}).then(getCar).catch(err => console.log(err));