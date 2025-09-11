export interface User {
  id: string;
  email: string;
  password: string;
  nickname: string;
}

export interface UserSignUp extends Omit<User, "id"> {}
export interface UserLogin extends Pick<User, "email" | "password"> {}
