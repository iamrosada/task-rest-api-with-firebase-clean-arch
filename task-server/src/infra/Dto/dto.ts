

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