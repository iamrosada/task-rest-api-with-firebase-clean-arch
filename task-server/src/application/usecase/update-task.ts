import { TaskEntity } from "../../domain/task";
import { TaskRepository } from "../repository/task-repository";


export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public updateTask = async (notesId: string, task: Omit<TaskEntity, "uuid"| "createdAt"| "updatedAt">) => {
    const taskUpdated = await this.taskRepository.update(notesId,task);
    return taskUpdated;
  };

  };