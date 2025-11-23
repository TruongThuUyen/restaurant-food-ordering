// Định nghĩa các hằng số cho Enum (tùy chọn)
export type UserRole = 'user' | 'admin' | 'moderator';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  city: string;
  address: string;

  fullName: string;
  role?: UserRole;
  dob?: Date;
  phone?: string;
  avatar?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRegister {
  email: string;
  password: string;
  city: string;
  fullName: string;
  address: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: string;
  token: string;
  email: string;
  fullname: string;
}
