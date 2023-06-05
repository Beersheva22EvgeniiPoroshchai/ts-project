import CompanyServiceJson from "./CompanyServiceJson.js"

export default class Poller {
    #time
    #oldData
    #newData
    #callbackFn
    #serviceUrl

constructor(time, callbackFn, serviceUrl) {
    this.#time = time;
    this.#callbackFn = callbackFn;
    this.#serviceUrl = new CompanyServiceJson(serviceUrl); 
    this.#startDataFn();
}

async #startDataFn() {
    this.#oldData = await this.#serviceUrl.getAllEmployees();
}


async start() {
    setInterval(async() => {
        this.#newData = await this.#serviceUrl.getAllEmployees();
if (JSON.stringify(this.#newData) != JSON.stringify(this.#oldData)) {
    this.#oldData = this.#newData;
    this.#callbackFn();
}
}, this.#time)
}


} 