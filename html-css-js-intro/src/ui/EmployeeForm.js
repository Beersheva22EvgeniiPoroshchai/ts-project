export default class EmployeeForm {
    #dataObj
    #formElement
    #configData
    #departmentElement
    #parentId
    #updFn

    constructor(parentId, config, updFn) {
        this.#updFn = updFn
        this.#parentId = parentId;
        this.#configData = config;
        const parentElement = document.getElementById(parentId);
        this.#dataObj = {}
        this.#fillForm(parentElement, parentId);
        this.#setElements(parentId);
        setOptionItems(this.#departmentElement, this.#configData.departments, "choose the department");
       
     }

    #fillForm(parentElement, parentId) {
       parentElement.innerHTML =
         `<form class="form-control" id="${parentId}-form-id">
            <div class="radio-group">
                <div class="radio-control">
                    <input id="${this.#parentId}-female-id" type="radio" name="gender" required value="female" unchecked>
                    <label for="female-id">female</label>
                </div>   
                <div class="radio-control">
                    <input id="${this.#parentId}-male-id" type="radio" name="gender" required value="male" unchecked>
                    <label for="male-id">male</label>
                </div>
            </div>   
            <div>
            <input id = "${this.#parentId}-name-input-id" class="input-elem" type="text" name="name" placeholder="enter an employee's name"> 
            </div>
            <input id = "${this.#parentId}-salary-input-id" class="input-elem" type="number" name="salary" min="${this.#configData.minSalary*1000}" max="${this.#configData.maxSalary*1000}" placeholder="enter a salary size"> 
            <div>
            <input id="${this.#parentId}-birth-input-id" class="input-elem" type="number" name="birthYear" min="${this.#configData.minYear}" max="${this.#configData.maxYear}" placeholder="enter a year of birth"> 
            </div>
            <div>
                <select id="${this.#parentId}-department-id" class="select" name="department">
                
              </select>
              
                <button type="submit" >Submit</button>
                
            </div>
            </form>   `

    }
    #setElements(parentId) {
        this.#formElement = document.getElementById(`${parentId}-form-id`);
        this.#departmentElement = document.getElementById(`${this.#parentId}-department-id`);
    
     }

    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.birthYear = formData.get('birthYear');
            this.#dataObj.name = formData.get('name');
            this.#dataObj.department = formData.get('department');
            await submitFn(this.#dataObj);
            this.#formElement.reset();

        }
    }


    updHandler(id) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.birthYear = formData.get('birthYear');
            this.#dataObj.name = formData.get('name');
            this.#dataObj.department = formData.get('department');
            this.#dataObj.id = id;
            await this.#updFn(this.#dataObj, id);
            this.#formElement.hidden = true;

        }
    }

    createUpdForm (obj) {
    document.getElementById(`${this.#parentId}-name-input-id`).value = obj.name;
    document.getElementById(`${this.#parentId}-salary-input-id`).value = obj.salary;
    document.getElementById(`${this.#parentId}-birth-input-id`).value = obj.birthYear;
    document.getElementById(`${this.#parentId}-department-id`).value = obj.department;
    if (obj.gender == "female") {
        document.getElementById(`${this.#parentId}-female-id`).checked = true;

    } else {
        document.getElementById(`${this.#parentId}-male-id`).checked = true;
    }

    }
}




function setOptionItems(element, options, placeHolder){
    element.innerHTML = `<option value hidden selected>--${placeHolder}--</option>`;
    element.innerHTML += options.map(option => `<option value = "${option}">${option}</option>`).join(''); 
}