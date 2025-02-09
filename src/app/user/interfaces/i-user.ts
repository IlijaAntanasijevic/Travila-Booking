interface IUserBase {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
}

export interface IUser extends IUserBase {
  id: number;

}


export interface IUserRequest extends IUserBase {
  oldPassword: string
  newPassword: string
}
