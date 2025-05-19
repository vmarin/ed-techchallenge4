export interface IUsers {
  id?: string;
  username: string;
  fullName: string;
  password: string;
  isAdmin: boolean;
  role: string;
  created_at?: Date;
  modified_at?: Date;
}
