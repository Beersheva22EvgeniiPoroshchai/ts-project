
// async function getTemperetures(lat, long) {
// const response = await fetch(`https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST`)
// return response.json();
// }

// getTemperetures(31.89, 34.81).then((data) => console.log(data)).catch((error) => console.log(error));

async function getTemperatures (lat, long, startDate, days, hourFrom, hourTo) {
//params: latitude, longitude, startDate - ISO date of forecast, days - forecast days, hourFrom - hourTo - closed range of the hours for each day
//returns: array of objects {date: <string containing date YYYY-MM-DD> with no time,
// time: <hour number from the given range>, temperature: <number>, apperantTemperature: <number>}

const endDate = getEndDate(startDate, days);
const url = getUrl(lat, long, startDate, endDate);
const response = await fetch(url);
const data = await response.json();
const dates = getDataForHours(data.hourly.time, hourFrom, hourTo);
const temperatures = getDataForHours(data.hourly.temperature_2m, hourFrom, hourTo);
const apparentTemperatures = getDataForHours(data.hourly.apparent_temperature, hourFrom, hourTo);
return dates.map((d, index) => {
    const tokens = d.split("T");
    const date = tokens[0];
    const time = tokens[1];
    return {date, time, temperature: temperatures[index], apparentTemperature: apparentTemperatures[index]}
})
}

function getDataForHours(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const rem = index % 24;
        return rem >= hourFrom && rem <= hourTo;
    })
}


function getUrl(lat, long, startDate, endDate) {
return `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${long}&hourly=temperature_2m,apparent_temperature&timezone=IST&start_date=${startDate}&end_date=${endDate}`;
}


function getEndDate(startDateStr, days) {
const startDate = new Date(startDateStr);
const endDate = new Date (startDate.setDate(startDate.getDate() + days));
return endDate.toISOString().substring(0,10);
}

//getTemperatures(31.29, 34.72, '2023-05-23', 2, 12, 14).then((data) => console.log(data)).catch((error) => console.log(error));





