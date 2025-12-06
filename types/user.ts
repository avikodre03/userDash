export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  verified: boolean;
  createdAt?: string;
  updatedAt?: string;
}
