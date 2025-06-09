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
  due: Date;
  userId: string;
}

export interface TaskParams {
  name: string;
  tags: string[];
  due: Date;
}

export interface Tag {
  _id: string;
  name: string;
  userId: string;
}
