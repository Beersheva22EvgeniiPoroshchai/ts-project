const BASE_URL_FOR_IMG = 'https://image.tmdb.org/t/p/w500';
export default class DetailsModal{
    
    #parentId;

    constructor(parentId){
        this.#parentId = parentId;
    }

    getMovieDetails (data) {
        const detailsElement = document.getElementById(this.#parentId);
        detailsElement.hidden = false;
        detailsElement.innerHTML = 

        `<div class="modalBackground" id="modalBackground">
        <div class="modalActive">
            <img class=thumbnails-image src="${BASE_URL_FOR_IMG+data.backdrop_path}">
            <ul>
                <li class=thumbnails-modal>Name: ${data.original_title}</li>
                <li class=thumbnails-modal>Overview: ${data.overview}</li>
                <li class=thumbnails-modal>Popularity: ${data.popularity}</li>
                <section id="add-to-lists-checkbox-section" hidden>
                <input type="checkbox" id="watch-list-id" name="watch" unchecked>
                <label for="watch-list-id">Add to watch list</label>
                <input type="checkbox" id="favorite-list-id" name="favorite" unchecked>
                <label for="favorite-list-id">Add to favorite list</label>
                </section
                <div>
                <a id = "details-close-id" href = "#">Close</a>
                </div>

            </ul>

        </div>
    </div>`

        const modal = document.getElementById("details-close-id");
        modal.onclick = function() {
            detailsElement.hidden = true;
        }

        const checkBoxListsElmn = document.getElementById("add-to-lists-checkbox-section");
        if (localStorage.getItem("currentUser") != null) {
            checkBoxListsElmn.hidden = false;
        } else {
            checkBoxListsElmn.hidden = true;
        }

    
//             const waitButListElem = document.getElementById("wait-list-id");
//             waitButListElem.addEventListener("click", () => {

// alert('ee')
//            })
        

    }
        
        
   
}
    

