export interface GraphqlData {
  query: string;
  variables?: { [key: string]: any };
}

export interface Task {
  uuid: string;
  number: number;
  name: string;
  description: string;
  url?: string;
  assign: Assign;
  status: Status;
}

export interface Assign {
  uuid?: string;
  name: string;
}

export interface Status {
  uuid?: string;
  name: string;
}

export interface SearchItem {
  fields: { [key: string]: any };
  highlight_fields: { [key: string]: any };
  url?: string;
}

export interface SearchResult {
  task?: SearchItem[];
  project?: SearchItem[];
  resource?: SearchItem[];
  page?: SearchItem[];
  space?: SearchItem[];
}