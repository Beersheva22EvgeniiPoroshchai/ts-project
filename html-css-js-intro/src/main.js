import openMeteoConfig from './config/service-config.json' assert {type: 'json'};
import OpenMeteoService from './service/OpenMeteoService.js';
import DataGrid from './ui/DataGrid.js';

//constants
const columns = [
    {field: 'date', headerName: 'Date'}, 
    {field: 'time', headerName: 'Time'}, 
    {field: 'temperature', headerName: 'Temperature, °C'}, 
    {field: 'apparentTemperature', headerName: 'Fealt Temp, °C'}, 
]

const headerWeatherAppStartPage = "Weather forecast for ";

//functions
function  getISODateStr(date) {
    return date.toISOString().substring(0,10);
}

function getEndDate(startDateStr, days){
    const date = new Date(startDateStr);
    const endDate = new Date(date.setDate(date.getDate() + days));
    return getISODateStr(endDate);
}

const fromFormData = {
    city: 'Tel Aviv',
    startDate: getISODateStr(new Date()),
    days: 1, hourFrom: 12, hourTo: 16
};


let headerApElement = fromFormData.city;
document.getElementById("header-ap-place").innerHTML = headerWeatherAppStartPage + headerApElement;


//objects
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);

//let a = 10; let b = 20; [a,b] = [b, a]   destruction array to variables

const table = new DataGrid("table-place", columns);

const latLong = openMeteoConfig.cities[fromFormData.city];

const {lat,long} = latLong;     //destruction
const{startDate, days, hourFrom, hourTo} = fromFormData;

openMeteoService.getTemperatures(lat, long, startDate, getEndDate(startDate, days), hourFrom, hourTo).
then(data => table.fillData(data));
    






