import { TaskRepository } from "../repository/task-repository";


export class ListTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public listTask = async () => {
    const task = await this.taskRepository.list();
    return task;
  };

  };