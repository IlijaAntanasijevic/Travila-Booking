export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginRequest extends ILogin {

}

export interface IToken {
  token: string;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
}


export interface IRegisterRequest extends IRegister {

}

export interface IConfirmEmail {
  email: string;
  code: string;
}

export interface IConfirmEmailRequest extends IConfirmEmail {

}