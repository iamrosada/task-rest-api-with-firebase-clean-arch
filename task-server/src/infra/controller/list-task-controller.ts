import { ListTaskUseCase } from "../../application/usecase/list-task";


export class ListTaskController {
  constructor(private listTaskUseCase: ListTaskUseCase) {}  
  public async listCtrl() {   
   
    // console.info(startAt, itemsPerPage,"hhhhhhhh")
    try {
      const task = await this.listTaskUseCase.listTask();
      console.info( task,"mmmmmm")

      return task;
    } catch (error) {
      throw new Error("Erro ao listar task: " + error.message);
    }
  }
}