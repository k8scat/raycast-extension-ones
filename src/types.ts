export interface LoginUser {
  email: string;
  password: string;
}

export interface GraphqlData {
  query: string;
  variables?: { [key: string]: any };
}

export interface ListTaskResponse {
  tasks: Task[];
  errorCode: string;
}

export interface Task {
  uuid: string;
  number: number;
  name: string;
  description: string;
  url?: string;
  assign: Assign;
}

export interface SearchForm {
  content: string;
}

export interface Assign {
  uuid?: string;
  name: string;
}