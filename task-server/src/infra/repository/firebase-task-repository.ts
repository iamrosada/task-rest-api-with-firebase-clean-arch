import { TaskRepository } from "../../application/repository/task-repository";
import { TaskEntity } from "../../domain/task";



export class FirebaseTaskRepository implements TaskRepository {
  create(task: TaskEntity): Promise<TaskEntity> {
    throw new Error("Method not implemented.");
  }
  delete(notesId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(noteId: string, task: Omit<TaskEntity, "uuid" | "createdAt" | "updatedAt">): Promise<TaskEntity> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<TaskEntity[]> {
    throw new Error("Method not implemented.");
  }

}
