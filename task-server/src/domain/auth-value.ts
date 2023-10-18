import { v4 as uuid } from "uuid";
import { AuthEntity } from "./authentication";


export class AuthValue implements AuthEntity {
  uuid: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
  email,
  password, 
  }: Omit<
  AuthEntity,
    "uuid" | "createdAt" |
    "updatedAt"
  >) {
    //@ts-ignore
    this.uuid = uuid();
    this.email= email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

}