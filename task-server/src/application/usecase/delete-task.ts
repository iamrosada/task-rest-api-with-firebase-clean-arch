import { TaskRepository } from "../repository/task-repository";


export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public deleteTask = async (notesId: string) => {
    const task = await this.taskRepository.delete(notesId);
    return task;
  };

  };