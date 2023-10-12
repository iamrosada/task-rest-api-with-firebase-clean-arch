import { ListTaskUseCase } from "../../application/usecase/list-task";


export class ListTaskController {
  constructor(private deleteTaskUseCase: ListTaskUseCase) {}
  public async listCtrl(taskId: string) {   
   
    try {
      const task = await this.deleteTaskUseCase.listTask();

      return task;
    } catch (error) {
      throw new Error("Erro ao listar task: " + error.message);
    }
  }
}