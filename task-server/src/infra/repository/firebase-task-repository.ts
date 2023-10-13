import { TaskRepository } from "../../application/repository/task-repository";
import { TaskEntity } from "../../domain/task";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from "../database/firebase/firebase";

export class FirebaseTaskRepository implements TaskRepository {

  async create(task: TaskEntity): Promise<TaskEntity> {
    try {
      const taskCollection = collection(db, 'tasks');
      const docRef = await addDoc(taskCollection, task);
      return { ...task, uuid: docRef.id };
    } catch (error) {
      throw new Error('Erro ao criar a tarefa: ' + error);
    }
  }

  async delete(noteId: string): Promise<void> {
    try {
      const taskRef = doc(db, 'tasks', noteId);
      await deleteDoc(taskRef);
    } catch (error) {
      throw new Error('Erro ao excluir a tarefa: ' + error);
    }
  }

  async update(noteId: string, task: Omit<TaskEntity, "uuid" | "createdAt" | "updatedAt">): Promise<TaskEntity> {
    try {
      const taskRef = doc(db, 'tasks', noteId);
      await updateDoc(taskRef, task);
      return { ...task, uuid: noteId };
    } catch (error) {
      throw new Error('Erro ao atualizar a tarefa: ' + error);
    }
  }

  async list(): Promise<TaskEntity[]> {
    try {
      const taskCollection = collection(db, 'tasks');
      const querySnapshot = await getDocs(taskCollection);
      const tasks: TaskEntity[] = [];

      querySnapshot.forEach((doc) => {
        const taskData = doc.data() as TaskEntity;
        tasks.push({ ...taskData, uuid: doc.id });
      });

      return tasks;
    } catch (error) {
      throw new Error('Erro ao listar as tarefas: ' + error);
    }
  }
}
