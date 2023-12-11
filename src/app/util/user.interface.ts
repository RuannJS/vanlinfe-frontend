export enum UserRole {
  CONSUMER = 'CONSUMER',
  HOST = 'HOST',
}

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  role: UserRole;
}
