import Rectangle from "./Rectangle";

export default class Square extends Rectangle {
    constructor (width: number) {
        super(width, width);
    }
}