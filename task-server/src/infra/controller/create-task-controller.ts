import { CreateTaskUseCase } from "../../application/usecase/create-task";
import { TaskCreateInputDto } from "../Dto/dto";


export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}
  public async insertCtrl(input: TaskCreateInputDto) {   
   
    try {
      const task = await this.createTaskUseCase.createTask(
        input.description,
        input.title,
      );

      return task;
    } catch (error) {
      throw new Error("Erro ao criar task: " + error.message);
    }
  }
}