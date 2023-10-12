import { UpdateTaskUseCase } from "../../application/usecase/update-task";
import { TaskCreateInputDto, TaskCreateOutputDto } from "../Dto/dto";


export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}
  public async updateCtrl(taskId: string, task: TaskCreateInputDto ) {   
   
    try {
      const taskUpdated = await this.updateTaskUseCase.updateTask(
      taskId,
      task
      )

      return taskUpdated as TaskCreateOutputDto;
    } catch (error) {
      throw new Error("Erro ao apagar task: " + error.message);
    }
  }
}