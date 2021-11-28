import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { preferences, showToast, ToastStyle } from "@raycast/api";

export enum Product {
  PROJECT = "project",
  WIKI = "wiki"
}

class Client {
  public baseURL: string;
  private baseAPI: string;
  private teamUUID: string;
  private userUUID: string;
  private token: string;
  private http: AxiosInstance;

  public constructor(baseAPI: string, teamUUID: string, userUUID: string, token: string) {
    this.baseAPI = baseAPI;
    this.teamUUID = teamUUID;
    this.userUUID = userUUID;
    this.token = token;
    this.http = this.createHttpClient();
    this.baseURL = `https://ones.ai/project/#/team/${teamUUID}`;
  }

  public get(product: Product, url: string, params?: { [key: string]: any }): Promise<any> {
    url = `${this.baseAPI}/${product}/team/${this.teamUUID}/${url}`;
    return this.http.get(url, {
      params
    });
  }

  public post(product: Product, url: string, data?: { [key: string]: any }): Promise<any> {
    url = `${this.baseAPI}/${product}/team/${this.teamUUID}/${url}`;
    return this.http.post(url, data);
  }

  private createHttpClient() {
    const httpClient = axios.create({
      baseURL: this.baseAPI,
      timeout: 30000
    });
    httpClient.interceptors.request.use((config) => {
      if (config.headers === undefined) {
        config.headers = {} as AxiosRequestHeaders;
      }
      config.headers["Ones-User-ID"] = this.userUUID;
      config.headers["Ones-Auth-Token"] = this.token;
      return config;
    }, function(error) {
      console.log(error);
      showToast(ToastStyle.Failure, error);
      return Promise.reject(error);
    });
    httpClient.interceptors.response.use((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return Promise.reject(response);
    }, function(err) {
      console.log("response err:", err);
      showToast(ToastStyle.Failure, "response err");
      return Promise.reject(err);
    });
    return httpClient;
  }
}

export default new Client(
  preferences.baseAPI.value as string,
  preferences.teamUUID.value as string,
  preferences.userUUID.value as string,
  preferences.token.value as string
);