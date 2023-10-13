import { TaskRepository } from "../repository/task-repository";


export class ListTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public listTask = async () => {
    // console.info("ListTaskUseCase", startAt, itemsPerPage)
    const task = await this.taskRepository.list();
    console.info("ListTaskUseCase", task)

    return task;
  };

  };