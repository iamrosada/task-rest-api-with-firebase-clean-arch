export interface AuthEntity {
  uuid: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
