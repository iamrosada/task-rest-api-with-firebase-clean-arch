import { TaskEntity } from "../../domain/task";

export interface TaskRepository{
  create(task: Omit<TaskEntity, "uuid"| "createdAt"| "updatedAt">):Promise<TaskEntity>
  delete(notesId:string):Promise<void>
  update(noteId: string, task: Omit<TaskEntity, "uuid"| "createdAt"| "updatedAt">):Promise<TaskEntity| null>
  list():Promise<TaskEntity[]| null>
}