export interface ILogin {
  email: string;
  password: string;
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
  // avatar: Blob;
}