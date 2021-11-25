import {
  ActionPanel,
  List,
  OpenInBrowserAction,
  CopyToClipboardAction,
  preferences,
} from "@raycast/api";
import { listTasks } from "./api";
import { Task } from './types';
import { useState } from "react";

export default function SearchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const onSearchTextChange = async (text: string) => {
    if (text.length > 0) {
      setLoading(true)
      setTasks(await listTasks(text));
      setLoading(false)
    }
  }
  
  return (
    <List
      isLoading={loading}
      onSearchTextChange={onSearchTextChange}
      throttle
    >
      {tasks.map((task: Task) => {
        task.url = `https://ones.ai/project/#/team/${preferences.teamUUID.value}/task/${task.uuid}`
        const title = `#${task.number} ${task.name}`;
        return (
          <List.Item
            key={`${task.number}`}
            title={title}
            subtitle={task.assign.name}
            keywords={[task.name]}
            actions={
              <ActionPanel>
                <OpenInBrowserAction url={task.url} />
                <CopyToClipboardAction title="Copy URL" content={task.url} />
              </ActionPanel>
            }
          />
        )
      })}
    </List>
  );
}
