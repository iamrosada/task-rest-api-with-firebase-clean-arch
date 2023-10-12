import { TaskValue } from "../../domain/task-value";
import { TaskRepository } from "../repository/task-repository";


export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) { }

  public createTask = async (
    title: string,
    description: string,

  ) => {

      const taskValue = new TaskValue({
        title,
        description,      
      });
      const taskCreated = await this.taskRepository.create(
        taskValue
      );
      return taskCreated;
    }

  };


