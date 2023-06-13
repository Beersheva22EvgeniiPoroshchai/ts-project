export default class SearchForm {
    #parentElement
    #filterFn
    #obj
    #genreElement
    #configGenres
    #formElmn



    constructor(parentElement, filterFn, configGenres) {
    this.#configGenres = configGenres;
    this.#parentElement = parentElement;
    this.#filterFn = filterFn;
    this.#obj = {};
    
  //  this.#setElements();
 

}


createSearchForm() {
    const searchFormElmn = document.getElementById(this.#parentElement);
    searchFormElmn.innerHTML = 
    
    ` <div class="modalBackground" id="modalBackground">
        <div class="modalActive">
    <form id = "search-form">
    <h1>Please, choose the searching request(s)</h1> 
    <label id="label-genres-id" for "select-genres-id">Choose the genre </label>
    <select id="select-genres-id" class="select" name="genres">
                
    </select>
<div>
    <button type="submit">Submit</button>
    </div>
    <div>
    <a id = "search-close-id" href = "#">Close search form</a>
</div>
   
</form>  `


this.#genreElement = document.getElementById("select-genres-id");
this.#setHandler();

setOptionItems(this.#genreElement, this.#configGenres, "choose the genre");

const modal = document.getElementById("search-close-id");
        modal.onclick = function() {
            searchFormElmn.hidden = true;
  }



}


// #setElements() {
//     this.#formElmn = document.getElementById("search-form");
//     this.#genreElement = document.getElementById("select-genres-id")
// }


#setHandler() {
   const searchFormElmn = document.getElementById(this.#parentElement);
   this.#formElmn = document.getElementById("search-form");
    
   this.#formElmn.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(this.#formElmn);
        this.#obj.genre = formData.get('genres');
        
        await this.#filterFn(this.#obj);
        searchFormElmn.hidden = true;
    }

}   

}


function setOptionItems(element, options, placeHolder) {
    element.innerHTML = `<option value hidden selected>--${placeHolder}--</option>`;
    element.innerHTML += options.map(option => `<option value = "${option}">${option}</option>`).join('');
}



