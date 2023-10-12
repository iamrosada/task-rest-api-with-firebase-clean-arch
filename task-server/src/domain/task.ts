
export interface TaskEntity{
  uuid: string,
  title: string,
  description: string,
  createdAt?:Date,
  updatedAt?: Date
}