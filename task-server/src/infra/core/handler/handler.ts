import express, { Request, Response, query } from "express";
import { taskCreateCtrl, taskDeleteCtrl, taskListCtrl, taskUpdateCtrl } from "../task-core";



// Rota para adicionar uma tarefa
export const handlerCreateTask = async (req: Request, res: Response) => {
  try {
    const taskCreatedResponse = await taskCreateCtrl.insertCtrl({
      title: req.body.title,
      description: req.body.description,
    });

    res
      .status(201)
      .json({
        message: "Tarefa adicionada com sucesso",
        taskId: taskCreatedResponse.uuid,
        data: taskCreatedResponse
      });
  } catch (error) {
    console.error("Erro ao adicionar a tarefa:", error);
    res.status(500).json({ error: "Erro ao adicionar a tarefa" });
  }
};

// Rota para recuperar todas as tarefas
export const handlerGetTasks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Página padrão: 1
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // Itens por página padrão: 10

    // Calcule o ponto de partida com base na página atual e itens por página
    const startAt = (page - 1) * itemsPerPage;
      
    
    // Chame sua função de listagem de tarefas com suporte a paginação
    const taskGotResponse = await taskListCtrl.listCtrl({startAt, itemsPerPage});

    if (!taskGotResponse) {
      return res.status(404).json({
        message: "Tasks not found",
      });
    }

    return res.status(200).json({
      message: "Got tasks with success",
      tasks: taskGotResponse,
    });
  } catch (error) {
    console.error("Erro ao procurar a tarefa:", error);
    res.status(500).json({ error: "Erro ao procurar a tarefa" });
  }
};







// Rota para atualizar uma tarefa por UUID
export const handlerUpdateTask = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const taskUpdatedResponse = await taskUpdateCtrl.updateCtrl(uuid,
      { title: req.body.title, description: req.body.description })
   
    res.status(200).json({ message: "Tarefa atualizada com sucesso" , task:taskUpdatedResponse});
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

// Rota para excluir uma tarefa por UUID
export const handlerDeleteTask = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;

     await taskDeleteCtrl.deleteCtrl(uuid)

    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
    res.status(500).json({ error: "Erro ao excluir a tarefa" });
  }
};
