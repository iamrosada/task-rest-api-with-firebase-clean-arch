import { ListResponseOutput, TaskRepository } from "../../application/repository/task-repository";
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

  async list(page = 1, itemsPerPage = 10, startAfterDoc = null):Promise<ListResponseOutput> {
    try {
      const taskCollection = collection(db, 'tasks');
      let baseQuery = query(taskCollection, orderBy('createdAt'));

      // If there is a starting point, use startAfter to start the query after that document
      if (startAfterDoc) {
        baseQuery = query(baseQuery, startAfter(startAfterDoc));
      }

      // Limit the results to the number of itemsPerPage
      baseQuery = query(baseQuery, limit(itemsPerPage));

      const querySnapshot = await getDocs(baseQuery);

      const results = querySnapshot.docs.map((doc) => {
        const taskData = doc.data();
        return { ...taskData, uuid: doc.id };
      }) as unknown as TaskEntity;

      return {
        tasks: results  as TaskEntity as unknown as TaskEntity[],
        nextPage: page + 1,
      };
    } catch (error) {
      console.error('Error retrieving data from Firestore:', error);
      throw new Error('Error retrieving data from Firestore: ' + error);
    }
  }
}
 

