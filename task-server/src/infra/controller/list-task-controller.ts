import { ListTaskUseCase } from "../../application/usecase/list-task";
import { TaskListInputDto } from "../dto/dto";


export class ListTaskController {
  constructor(public listTaskUseCase: ListTaskUseCase) {}
  public async listCtrl(input:TaskListInputDto) {   
   
    try {
      const task = await this.listTaskUseCase.listTask(input.startAt, input.itemsPerPage);

      return task;
    } catch (error) {
      throw new Error("Erro ao listar task: " + error.message);
    }
  }
}