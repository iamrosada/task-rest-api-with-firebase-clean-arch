import express from "express";
import { app } from "../../server-task";
import { handlerCreateTask, handlerDeleteTask, handlerGetTasks, handlerUpdateTask } from "../core/handler/handler";



export default function runServer() {
  const router = express.Router();


  app.post('/tasks', handlerCreateTask);
  
  app.get('/tasks', handlerGetTasks);
  
  app.patch('/tasks/:uuid',handlerUpdateTask);
  
  app.delete('/tasks/:uuid', handlerDeleteTask);


  app.use('/', router);
}

