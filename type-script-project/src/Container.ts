import Shape from "./Shape";

export default class Container implements Shape {
    private _shapes: Shape[];
    constructor(shapes: Shape[]) {
        this._shapes = shapes.slice();
    }

    get shapes() {
        return this._shapes.slice();
    }


    perimeter(): number {
        return this._shapes.reduce((res, cur) => res + cur.perimeter(), 0);
    }

    square(): number {
         return this._shapes.reduce((res, cur) => res + cur.square(), 0);
    }

    addShape(shape: Shape): void {
        this._shapes.push(shape);
    }

}