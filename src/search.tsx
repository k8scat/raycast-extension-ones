import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction } from "@raycast/api";
import { search, SearchType } from "./lib/api";
import { SearchItem, SearchResult } from "./lib/types";
import { useState } from "react";
import client, { Product } from "./lib/http";

interface Props {
  product: Product;
  searchType: SearchType[];
}

export function Search(props: Props) {
  const [searchResult, setSearchResult] = useState<SearchResult>({});
  const [loading, setLoading] = useState<boolean>(false);
  const onSearchTextChange = async (text: string) => {
    if (text.length === 0) {
      return;
    }
    setLoading(true);
    const result = await search(props.product, text, props.searchType);
    result.project = result.project?.map((project) => {
      project.url = `${client.baseURL}/project/${project.fields.uuid}`;
      return project;
    });
    result.task = result.task?.map((task) => {
      task.url = `${client.baseURL}/task/${task.fields.uuid}`;
      return task;
    });
    result.space = result.space?.map((space) => {
      space.url = `${client.baseURL}/space/${space.fields.uuid}`;
      return space;
    });
    console.log(result.space);
    result.page = result.page?.map((page) => {
      page.url = `${client.baseURL}/page/${page.fields.page_uuid}`;
      return page;
    });
    result.resource = result.resource?.map((resource: SearchItem) => {
      resource.url = `${client.baseURL}/resource/${resource.fields.uuid}`;
      return resource;
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
      {searchResult.project ?
        searchResult.project.map(
          (item: SearchItem, index: number) => (
            <List.Item
              key={index}
              title={item.fields.name}
              actions={
                <ActionPanel>
                  <OpenInBrowserAction url={item.url ? item.url : ""} />
                  <CopyToClipboardAction title="Copy URL" content={item.url ? item.url : ""} />
                </ActionPanel>
              }
            />
          )
        ) : null}
      {searchResult.task ?
        searchResult.task.map(
          (item: SearchItem, index: number) => (
            <List.Item
              key={index}
              title={`#${item.fields.number} ${item.fields.summary}`}
              subtitle={item.fields.desc}
              actions={
                <ActionPanel>
                  <OpenInBrowserAction url={item.url ? item.url : ""} />
                  <CopyToClipboardAction title="Copy URL" content={item.url ? item.url : ""} />
                </ActionPanel>
              }
            />
          )
        ) : null}
      {searchResult.space ?
        searchResult.space.map(
          (item: SearchItem, index: number) => (
            <List.Item
              key={index}
              title={item.fields.title}
              subtitle={item.fields.description}
              actions={
                <ActionPanel>
                  <OpenInBrowserAction url={item.url ? item.url : ""} />
                  <CopyToClipboardAction title="Copy URL" content={item.url ? item.url : ""} />
                </ActionPanel>
              }
            />
          )
        ) : null}
      {searchResult.page ?
        searchResult.page.map(
          (item: SearchItem, index: number) => (
            <List.Item
              key={index}
              title={item.fields.title}
              subtitle={item.fields.summary}
              actions={
                <ActionPanel>
                  <OpenInBrowserAction url={item.url ? item.url : ""} />
                  <CopyToClipboardAction title="Copy URL" content={item.url ? item.url : ""} />
                </ActionPanel>
              }
            />
          )
        ) : null}
      {searchResult.resource ?
        searchResult.resource.map(
          (item: SearchItem, index: number) => (
            <List.Item
              key={index}
              title={item.fields.name}
              actions={
                <ActionPanel>
                  <OpenInBrowserAction url={item.url ? item.url : ""} />
                  <CopyToClipboardAction title="Copy URL" content={item.url ? item.url : ""} />
                </ActionPanel>
              }
            />
          )
        ) : null}
    </List>
  );
}
