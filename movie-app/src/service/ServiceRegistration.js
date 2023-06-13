export default class ServiceRegistration {
        
    #url
   
    constructor(url) {
    this.#url = url;
    }

        #getUrlById(id) {
            return `${this.#url}/${id}`;
        }


        async addUser (userName) {
            const response = await fetch (this.#url , {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(userName)
        });
        return await response.json();
    }     

    
    async getUserById(id) {
        const response = await fetch(this.#getUrlById(id));
        return await response.json();
    }


    async getUserByName(userName) {
        const urlUserName = `${this.#url}?name=${userName}`
        const response = await fetch(urlUserName);
        const res = await response.json();
        return res;
    }
   
    async updUserById (userName) {
        const response = await fetch(this.#getUrlById(user.id), {
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userName)
    });
    return await response.json();
       }


       async userSignIn (userName, password) {
        const urlSignInUser = `${this.#url}?name=${userName}&password=${password}`;
        const response = await fetch(urlSignInUser);
        const res = await response.json();
        return res;
       }

}