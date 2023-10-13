import { TaskRepository } from "../repository/task-repository";


export class ListTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public listTask = async (page:number, itemsPerPage:number, startAfterDoc:any) => {
    
    const task = await this.taskRepository.list(page, itemsPerPage, startAfterDoc);

    return task;
  };

  };