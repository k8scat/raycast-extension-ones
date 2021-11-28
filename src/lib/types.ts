export interface GraphqlData {
  query: string;
  variables?: { [key: string]: any };
}

export interface Sprint {
  uuid: string;
  number: number;
  name: string;
  description: string;
  assign: Assign;
  project: Project;
  url?: string;
}

export interface Assign {
  uuid?: string;
  name: string;
}

export interface Project {
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