export interface User {
  _id: string;
  username: string;
  password: string;
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

export interface Tag {
  _id: string;
  name: string;
  user: number;
}
