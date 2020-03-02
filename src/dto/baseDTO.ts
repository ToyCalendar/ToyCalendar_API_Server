export class BaseDTO<T> {
    public data: T;

    constructor(data: T) {
        this.data = data;
    }

    public toVO() {
        return {
            data: this.data,
        };
    }
}
