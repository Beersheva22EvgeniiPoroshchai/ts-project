export default class DataGrid {
    #tBodyElement
    #keys
    #removeButtons
    #updButtons
    #delFromObjFn
    #updFromObjFn
    


    constructor(parentId, columns, delFromObjFn, updFromObjFn) {
        //columns - array of objects {field: <name of key>,
        // headerName: <column name>}
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c => c.headerName));
        this.#delFromObjFn = delFromObjFn;
        this.#updFromObjFn = updFromObjFn;
       
    }
    
    fillData(rowsData) {
        this.#tBodyElement.innerHTML = rowsData.map((rd, index) => this.#getRow(rd, index)).join('');
        this.#setButtons();
    }

    #getRow(obj, index) {
        return `<tr>
                   ${this.#keys.map((key) => `<td>${obj[key]}</td>`).join('')}
                   <td class="buttons-block" hidden>
                   <button id="button-upd-${index}">Update</button>
                   <button id="button-rem-${index}">Remove</button>
                   </td>
                 </tr>`
    }


    #setButtons() {
        
        this.#removeButtons = [];
        this.#updButtons = [];
        const arrayOfRows = Array.from(this.#tBodyElement.children);
        arrayOfRows.forEach((__, index) => {
            this.#removeButtons.push(document.getElementById(`button-rem-${index}`));
        });
        this.#removeButtons.forEach((buttonRemElem, index) => buttonRemElem.addEventListener("click", () => {
            const buttonParent = buttonRemElem.parentNode;
            const delRow = buttonParent.parentNode;
            const id = Array.from(delRow.children)[0].innerText;
            this.#tBodyElement.removeChild(delRow);
            this.#delFromObjFn(id);
         }));

         arrayOfRows.forEach((__, index) => {
            this.#updButtons.push(document.getElementById(`button-upd-${index}`));
        });
        this.#updButtons.forEach((buttonUpdElem, index) => buttonUpdElem.addEventListener("click", () => {
            const buttonParent = buttonUpdElem.parentNode;
            const updRow = buttonParent.parentNode;
            document.getElementById('update-table-place').hidden = false;
            const id = Array.from(updRow.children)[0].innerText;
            this.#updFromObjFn(id);
         }))
        
        }

    hideButton() {
        const butElem = Array.from(document.getElementsByClassName("buttons-block"));
        butElem.forEach(elem => elem.hidden = false);
        
    }


    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj)
    }
    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<table>
            <thead>
               <tr>
                   ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
               </tr>
            </thead>
            <tbody id="${parentId}-table" >
            </tbody>
          </table>`
        this.#tBodyElement = document.getElementById(parentId + "-table")

    }

    




}