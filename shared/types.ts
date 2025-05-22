export interface User {
  id: number;
}

export interface Task {
  _id: string;
  name: string;
  complete: boolean;
  tags: string[];
  due: string;
  user: number;
}

export interface TaskParams {
  name: string;
  tags: string[];
  due: string;
}
