
export default class SignUpForm {
    #parentElement
    #obj
    #formElmn
    #submitFn


  //  #parentId
    
constructor (parentElement, submitFn) {
    this.#parentElement = parentElement;
    this.#obj = {};
    this.#submitFn = submitFn;
 //   this.createSignUpForm(parentElement);
}


createSignUpForm() {

const signUpElmn = document.getElementById(this.#parentElement);
signUpElmn.hidden = false;
signUpElmn.innerHTML = 

`
<div class="modalBackground" id="modalBackground">
        <div class="modalActive">
<form id = "sign-up-form">
    <h1> Please, enter your username and password for registration</h1> 
    <div>
    <label id = "sign-up-name-label-id" for "sign-up-name-input-id">Username: </label>
    <input id = "sign-up-name-input-id" class="input-elem" type="text" name="name" placeholder="enter a possible username" required> 
    </div>
    <div>
    <label id = "sign-up-password-label-id" for "sign-up-name-input-id">Password: </label>
    <input id = "sign-up-password-input-id" class="input-elem" type="password" name="password" placeholder="enter a password" required> 
    </div>
    <button type="submit">Submit</button>
    <a id = "sign-up-close-id" href = "#">Close form</a>
    </div>
    </div>

</form>`


this.#setHandler();

const modal = document.getElementById("sign-up-close-id");
        modal.onclick = function() {
            signUpElmn.hidden = true;
        }

}


#setHandler() {
    this.#formElmn = document.getElementById("sign-up-form");
    
    this.#formElmn.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(this.#formElmn);
        this.#obj.name = formData.get('name');
        this.#obj.password = formData.get('password');
        this.#obj.watchingList = [];
        this.#obj.favoriteList = [];
        await this.#submitFn(this.#obj);
        this.#formElmn.reset();

    }





}
}
