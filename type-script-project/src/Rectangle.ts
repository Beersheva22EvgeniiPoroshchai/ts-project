import Shape from "./Shape";

export default class Rectangle implements Shape {
    constructor(private _width: number, private _height: number) {

    }
    perimeter(): number {
        return (this._width+ this._height * 2);
    }
    square(): number {
        return (this._width * this._height);
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

}



