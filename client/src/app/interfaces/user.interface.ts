export interface User {
  _id: string;
  name: string;
  photo: string;
}

export interface CreateUser {
  name: string;
  photo?: string;
}
