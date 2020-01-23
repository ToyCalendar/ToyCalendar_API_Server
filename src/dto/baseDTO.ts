export class BaseDTO<T> {
    data: T;

    constructor(data: T) {
        this.data = data;
    }

    toVO() {
        return {
            data: this.data
        }
    }
}
