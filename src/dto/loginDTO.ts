export class LoginDTO {

    constructor(readonly token: string) {}

    public toVO() {
        return {
            token: this.token,
        };
    }
}
