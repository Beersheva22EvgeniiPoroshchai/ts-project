import { count } from "../util/number-functions.js";
import { getRandomInt } from "../util/random.js";
const minId = 100000;
const maxId = 1000000;

//TODO by using setTimeout update the CompanyService code that
//each public method returns Promise that after some timeout moves
//in the resolved state
export default class CompanyServiceJson {
   #url
   
    constructor(url) {
   this.#url = url;
    }

        #getUrlById(id) {
            return `${this.#url}/${id}`;
        }


        async addEmployee(employee) {
            const response = await fetch (this.#url , {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(employee)
        });
        return await response.json();
    }     

        async delEmplById(id) {
            const response = await fetch(this.#getUrlById(id), {
                method: 'DELETE',
                headers: {"Content-Type":"application/json"},
            });
            return await response.json();
    }

    async getEmplById(id) {
        const response = await fetch(this.#getUrlById(id));
        return await response.json();
    }

    async getAllEmployees() {
        const response = await fetch(this.#url);
        return await response.json();
    }


    async updEmplById (employee) {
        const response = await fetch(this.#getUrlById(employee.id), {
             method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(employee)
    });
    return await response.json();
       }



    async getStatistics(field, interval) {
        let array = await this.getAllEmployees();
        const currentYear = new Date().getFullYear();
        
        if (field == 'birthYear') {
            array = array.map(e => ({'age': currentYear - e.birthYear}));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return {min, max, count: e[1]};
        })
    }
    
  
    
}
 









