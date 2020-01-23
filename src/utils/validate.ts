type Params<T = any> = ReadonlyArray<Readonly<T>>;

function validFunc(value: Readonly<any>): boolean {
    return value !== null && value !== undefined
}

function invalidFunc(value: Readonly<any>): boolean {
    return value === null || value === undefined;
}

export function valid(value: any, ...params: any[]): boolean {
    if (params.length) {
        return [value, ...params].every(validFunc);
    }
    return validFunc(value);
}

export function invalid(value: any, ...params: any[]): boolean {
    if (params.length) {
        return [value, ...params].some(invalidFunc);
    }
    return invalidFunc(value);
}

function validNumberFunc(value: Readonly<number>): boolean {
    return valid(value) && !isNaN(value) && isFinite(value);
}

function invalidNumberFunc(value: Readonly<number>): boolean {
    return invalid(value) || isNaN(value) || !isFinite(value);
}


export function validNumber(value: Readonly<number>, ...params: Params<number>): boolean {
    if (params.length) {
        return [value, ...params].every(validNumberFunc);
    }
    return validNumberFunc(value);
}

export function invalidNumber(value: Readonly<number>, ...params: Params<number>): boolean {
    if (params.length) {
        return [value, ...params].some(invalidNumberFunc);
    }
    return invalidNumberFunc(value);
}
