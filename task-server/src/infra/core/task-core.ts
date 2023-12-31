import { CreateTaskUseCase } from "../../application/usecase/create-task";
import { DeleteTaskUseCase } from "../../application/usecase/delete-task";
import { ListTaskUseCase } from "../../application/usecase/list-task";
import { UpdateTaskUseCase } from "../../application/usecase/update-task";
import { CreateTaskController } from "../controller/create-task-controller";
import { DeleteTaskController } from "../controller/delete-task-controller";
import { ListTaskController } from "../controller/list-task-controller";
import { UpdateTaskController } from "../controller/update-task-controller";
import { FirebaseTaskRepository } from "../repository/firebase-task-repository";

/**
 * Iniciar Repository
 */
const taskRepo = new FirebaseTaskRepository();

/**
 * Iniciamos casos de uso
 */

const taskCreateUseCase = new CreateTaskUseCase(taskRepo)
const taskDeleteUseCase = new DeleteTaskUseCase(taskRepo)
const taskUpdateUseCase = new UpdateTaskUseCase(taskRepo)
const taskListUseCase = new ListTaskUseCase(taskRepo)


/**
 * Iniciar task Controller
 */

 const taskCreateCtrl = new CreateTaskController(taskCreateUseCase);
 const taskDeleteCtrl = new DeleteTaskController(taskDeleteUseCase);
 const taskUpdateCtrl = new UpdateTaskController(taskUpdateUseCase);
 const taskListCtrl = new ListTaskController(taskListUseCase);

export { taskCreateCtrl, taskDeleteCtrl, taskUpdateCtrl,taskListCtrl}