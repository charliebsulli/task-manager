export interface User {
  id: number;
}

export interface Task {
  id: number;
  name: string;
  complete: boolean;
  tags: string[];
  due: string;
  user: number;
}
