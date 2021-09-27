export class RegisterDto {

    name!: string;
    mobileNo!: number;
    email!: string;
    password!: string;
    role!: string;
    registerDate!: string;
    account!: string;

    constructor(registerObj : any)
    {
        this.name = registerObj.name;
        this.mobileNo = registerObj.mobileNo;
        this.email = registerObj.email;
        this.password = registerObj.password;
        this.role = registerObj.role;
        this.registerDate = registerObj.registerDate;
        this.account = registerObj.account;
    }


}
