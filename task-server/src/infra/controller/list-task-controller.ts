import { ListTaskUseCase } from "../../application/usecase/list-task";


export class ListTaskController {
  constructor(private listTaskUseCase: ListTaskUseCase) {}  
  public async listCtrl(page:number, itemsPerPage:number, startAfterDoc:any) {   
   
    try {
      const task = await this.listTaskUseCase.listTask(page, itemsPerPage, startAfterDoc);

      return task;
    } catch (error) {
      throw new Error("Erro ao listar task: " + error.message);
    }
  }
}