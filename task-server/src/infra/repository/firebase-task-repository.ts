import { TaskRepository } from "../../application/repository/task-repository";
import { TaskEntity } from "../../domain/task";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  startAfter,
  query,
  limit,
  QueryStartAtConstraint,
  orderBy,
} from 'firebase/firestore';
import { db } from "../database/firebase/firebase";

export class FirebaseTaskRepository implements TaskRepository {

  async create(task: TaskEntity): Promise<TaskEntity> {
    try {
      console.info(task)
      const taskData = {
        uuid: task.uuid,
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };

      const taskCollection = collection(db, 'tasks');
      const docRef = await addDoc(taskCollection, taskData);
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

  async list(page: number, itemsPerPage: number): Promise<TaskEntity[]> {
    try {
      const taskCollection = collection(db, 'tasks');
      
      // Order the documents by a specific field (e.g., createdAt)
      const orderedQuery = query(taskCollection, orderBy('createdAt'));
  
      // Determine the document to start after based on the page and items per page
      const startAfterDoc = startAfter(orderedQuery, page * itemsPerPage);
  
      // Limit the results to the specified number of items per page
      const limitedQuery = query(startAfterDoc as any, limit(itemsPerPage));
  
      const querySnapshot = await getDocs(limitedQuery);
  
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
