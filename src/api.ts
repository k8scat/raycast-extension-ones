import http from './http';
import { GraphqlData, Task, ListTaskResponse } from './types';
import { showToast, ToastStyle } from "@raycast/api";


export async function listTasks(key: string): Promise<Task[]> {
  const keyInt = parseInt(key);
  const uuid = /^[a-zA-Z0-9]{16}$/.test(key) ? key : "";
  const query = `
  {
    tasks (
      filterGroup: [
        {
          number_equal: ${keyInt ? keyInt : 0}
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
    }
  }`;
  console.log(query);
  const data: GraphqlData = { query };
  try {
    const resp = await http.post("/items/graphql", data);
    return Promise.resolve(resp.data.tasks as Task[]);
  } catch (error) {
    showToast(ToastStyle.Failure, "List tasks failed");
    return Promise.reject(error);
  }
}