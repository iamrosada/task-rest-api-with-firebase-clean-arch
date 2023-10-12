import { v4 as uuid } from "uuid";
import { TaskEntity } from "./task";


export class TaskValue implements TaskEntity {
  uuid: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    title,
   description
  }: Omit<
    TaskEntity,
    "uuid" | "createdAt" |
    "updatedAt"
  >) {
    //@ts-ignore
    this.uuid = uuid();
    this.title = title;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

}