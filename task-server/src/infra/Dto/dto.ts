

export interface TaskCreateInputDto{
  title: string;
  description: string;

}

export interface TaskCreateOutputDto{
  uuid: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface TaskListInputDto{
  startAt:number; itemsPerPage:number
}


export interface UserInputDto{
  email: string;
  password: string;

}

export interface UserOutputDto{
  uuid: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OutPutUserAuth = {
  accessToken?: string|null;
}