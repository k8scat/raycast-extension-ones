import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction, render } from "@raycast/api";
import { searchSprints } from "./lib/api";
import { Sprint } from "./lib/types";
import { useState } from "react";
import client from "./lib/http";

export function SearchSprints() {
  const [searchResult, setSearchResult] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onSearchTextChange = async (text: string) => {
    text = text.trim();
    if (text.length === 0) {
      return;
    }
    setLoading(true);
    const result = await searchSprints(text);
    result.map((sprint) => {
      sprint.url = `${client.baseURL}/project/${sprint.project.uuid}/sprint/${sprint.uuid}`;
      return sprint;
    });
    setSearchResult(result);
    setLoading(false);
  };

  return (
    <List
      isLoading={loading}
      onSearchTextChange={onSearchTextChange}
      throttle
    >
      {searchResult.map(
        (item: Sprint, index: number) => (
          <List.Item
            key={index}
            title={item.name}
            actions={
              <ActionPanel>
                <OpenInBrowserAction url={item.url ? item.url : ""} />
                <CopyToClipboardAction title="Copy URL" content={item.url ? item.url : ""} />
              </ActionPanel>
            }
          />
        )
      )}
    </List>
  );
}

render(<SearchSprints />);
