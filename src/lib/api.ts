import client, { Product } from "./http";
import { GraphqlData, SearchResult, Task } from "./types";
import { showToast, ToastStyle } from "@raycast/api";

export enum SearchType {
  PROJECT = "project",
  TASK = "task",
  RESOURCE = "resource",
  PAGE = "page",
  SPACE = "space"
}

export async function queryTasks(key: string): Promise<Task[]> {
  let number = parseInt(key);
  number = isNaN(number) ? 0 : number;
  const uuid = /^[a-zA-Z0-9]{16}$/.test(key) ? key : "";
  const query = `
  {
    tasks (
      filterGroup: [
        {
          number_equal: ${number}
        }
        {
          uuid_equal: "${uuid}"
        }
        {
          name_match: "${key}"
        },
        {
          description_match: "${key}"
        }
      ]
      limit: 50
    ) {
      uuid
      number
      name
      description
      assign {
        name
      }
      status {
        name
      }
    }
  }`;
  const data: GraphqlData = { query };
  try {
    const resp = await client.post(Product.PROJECT, "items/graphql", data);
    return Promise.resolve(resp.data.tasks as Task[]);
  } catch (err) {
    showToast(ToastStyle.Failure, "search tasks failed", (err as Error).message);
    return Promise.reject(err);
  }
}

export async function search(product: Product, q: string, types: SearchType[]): Promise<SearchResult> {
  const params = {
    q,
    limit: 50,
    start: 0,
    types: types.join(",")
  };
  try {
    const resp = await client.get(product, "search", params);
    showToast(ToastStyle.Success, `耗时 ${resp.took_time}ms`);
    return Promise.resolve(resp.datas as SearchResult);
  } catch (err) {
    showToast(ToastStyle.Failure, "search project failed", (err as Error).message);
    return Promise.reject(err);
  }
}
