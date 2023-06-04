export default class Spinner {
    #spinnerElement;

    constructor(parentId) {
    const parentElement = document.getElementById(parentId);
    parentElement.innerHTML = `<div class="spinner" hidden></div>`;
    this.#spinnerElement = parentElement.childNodes[0];
}

start() {
    this.#spinnerElement.hidden = false;
}

stop() {
    this.#spinnerElement.hidden = true;
}

}
