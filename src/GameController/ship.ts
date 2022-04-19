export class Ship {
    public name: string;
    public size: number;
    public positions: Array<any>;

    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.positions = [];
    }

    addPosition(position) {
        this.positions.push(position);
    }
}
