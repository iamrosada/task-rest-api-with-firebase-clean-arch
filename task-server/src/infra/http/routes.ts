import express from "express";
import { app } from "../../server-task";
import {
  handlerCreateTask,
  handlerDeleteTask,
  handlerGetTasks,
  handlerUpdateTask,
} from "../core/handler/handler";
import {
  handlerLogInWithEmailAndPassword,
  handlerRegisterWithEmailAndPassword,
  handlerSignInWithGoogle,
  handlerSendPasswordReset,
  handlerLogout,
} from "../core/handler/handler-auth";
import { Middleware } from "../core/middlewares/ensureAuthenticated";
const middlewareInstance = new Middleware();

export default function runServer() {
  const router = express.Router();

  // app.use(middlewareInstance.decodeToken)
  app.post("/tasks", handlerCreateTask);


  // app.use(middlewareInstance.decodeToken)
  app.get("/tasks", handlerGetTasks);

  // app.use(middlewareInstance.decodeToken)
  app.patch("/tasks/:uuid", handlerUpdateTask);

  // app.use(middlewareInstance.decodeToken)
  app.delete("/tasks/:uuid", handlerDeleteTask);

  // Authentication-related routes
  app.post("/auth/login", handlerLogInWithEmailAndPassword);
  app.post("/auth/register", handlerRegisterWithEmailAndPassword);
  app.get("/auth/signInWithGoogle", handlerSignInWithGoogle);
  app.post("/auth/sendPasswordReset", handlerSendPasswordReset);
  app.get("/auth/logout", handlerLogout);

  app.use("/", router);
}
