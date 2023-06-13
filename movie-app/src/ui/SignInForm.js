export default class SignInForm {
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


createSignInForm() {

const signInElmn = document.getElementById(this.#parentElement);
signInElmn.hidden = false;
signInElmn.innerHTML = 

`
<div class="modalBackground" id="modalBackground">
        <div class="modalActive">
<form id = "sign-in-form">
    <h1> Please, enter your username and password for authorization</h1> 
    <div>
    <label id = "sign-in-name-label-id" for "sign-in-name-input-id">Username: </label>
    <input id = "sign-in-name-input-id" class="input-elem" type="text" name="name" placeholder="enter your username" required> 
    </div>
    <div>
    <label id = "sign-in-password-label-id" for "sign-in-name-input-id">Password: </label>
    <input id = "sign-in-password-input-id" class="input-elem" type="password" name="password" placeholder="enter your password" required> 
    </div>
    <button type="submit">Submit</button>
    <a id = "sign-in-close-id" href = "#">Close form</a>
    </div>
    </div>

</form>`


this.#setHandler();

const modal = document.getElementById("sign-in-close-id");
        modal.onclick = function() {
            signInElmn.hidden = true;
            
        }

}


#setHandler() {
    this.#formElmn = document.getElementById("sign-in-form");
    
    this.#formElmn.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(this.#formElmn);
        this.#obj.name = formData.get('name');
        this.#obj.password = formData.get('password');
        await this.#submitFn(this.#obj);
        this.#formElmn.reset();

    }



}
}