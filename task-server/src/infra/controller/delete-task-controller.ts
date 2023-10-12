import { DeleteTaskUseCase } from "../../application/usecase/delete-task";


export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}
  public async deleteCtrl(taskId: string) {   
   
    try {
      const task = await this.deleteTaskUseCase.deleteTask(
      taskId
      );

      return task;
    } catch (error) {
      throw new Error("Erro ao apagar task: " + error.message);
    }
  }
}