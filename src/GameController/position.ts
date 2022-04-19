export class Position {
    public column: number;
    public row: number;
    constructor(column, row) {
        this.column = column;
        this.row = row;
    }

    toString() {
        return this.column.toString() + this.row.toString()
    }

}