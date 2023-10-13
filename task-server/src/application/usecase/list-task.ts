import { TaskRepository } from "../repository/task-repository";


export class ListTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public listTask = async (startAt:number, itemsPerPage:number) => {
    const task = await this.taskRepository.list(startAt, itemsPerPage);
    return task;
  };

  };