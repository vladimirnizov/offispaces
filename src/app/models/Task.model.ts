export class Task {

    constructor(private _title: string,
        private _description: string,
        private _price: number
        )
        {}

    public get title(): string {
        return this._title;
    }
    public set title(title: string) {
        this._title = title;
    }
    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    public get price(): number {
        return this._price;
    }
    public set price(price: number) {
        this._price = price;
    }


}