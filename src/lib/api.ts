import client, { Product } from "./http";
import { GraphqlData, SearchResult, Sprint } from "./types";
import { showToast, ToastStyle } from "@raycast/api";

export enum SearchType {
  PROJECT = "project",
  TASK = "task",
  RESOURCE = "resource",
  PAGE = "page",
  SPACE = "space"
}

export async function searchSprints(key: string): Promise<Sprint[]> {
  const query = `
  {
    sprints (
      filterGroup: [
        {
          name_match: "${key}"
        },
        {
          description_match: "${key}"
        }
        {
          assign: {
            name_match: "${key}"
          }
        }
      ]
      limit: 100
    ) {
      uuid
      name
      description
      assign {
        uuid
        name
      }
      project {
        uuid
        name
      }
    }
  }`;
  const data: GraphqlData = { query };
  try {
    const resp = await client.post(Product.PROJECT, "items/graphql", data);
    return Promise.resolve(resp.data.sprints as Sprint[]);
  } catch (err) {
    showToast(ToastStyle.Failure, "search sprints failed", (err as Error).message);
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
