import openMeteoConfig from './config/service-config.json' assert {type: 'json'};
import OpenMeteoService from './service/OpenMeteoService.js';
import DataGrid from './ui/DataGrid.js';
import WeatherForm from './ui/WeatherForm.js';
import { getEndDate} from './util/date-functions.js'


//constants
const columns = [
    {field: 'date', headerName: 'Date'}, 
    {field: 'time', headerName: 'Time'}, 
    {field: 'temperature', headerName: 'Temperature, °C'}, 
    {field: 'apparentTemperature', headerName: 'Fealt Temp, °C'}, 
]

const headerWeatherAppStartPage = "Weather forecast for ";

//functions




//objects

const form = new WeatherForm("form-place", 
Object.keys(openMeteoConfig.cities), openMeteoConfig.maxDays)
const openMeteoService = new OpenMeteoService(openMeteoConfig.baseUrl);

//let a = 10; let b = 20; [a,b] = [b, a]   destruction array to variables

const table = new DataGrid("table-place", columns);

async function run() {
    while (true) {
const fromFormData = await form.getDataFromForm()
const{startDate, days, hourFrom, hourTo, city} = fromFormData;
const {lat, long} = openMeteoConfig.cities[city];
const temperatures = await openMeteoService.getTemperatures(lat, long, startDate, getEndDate(startDate, days), hourFrom, hourTo);
table.fillData(temperatures);
    }
}
run();
    






