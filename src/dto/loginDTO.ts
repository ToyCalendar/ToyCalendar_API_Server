export class LoginDTO {

    constructor(readonly token: string) {}

    toVO() {
        return {
            token: this.token
        }
    }
}
