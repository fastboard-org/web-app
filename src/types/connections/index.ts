export enum ConnectionType {
  REST = "REST",
  MONGO = "MONGO",
  SQL = "SQL",
}

export interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  credentials: any;
  variables: any;
}

export interface Query {
  id: string;
  name: string;
  connection_id: string;
  connection_type: ConnectionType;
  connection?: Connection;
  metadata: any;
}

export interface QueryParameter {
  name: string;
  preview: string;
}

export interface RestHeader {
  key: string;
  value: string;
}

export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface RestQueryData {
  queryId: string;
  connectionId: string;
  method: HTTP_METHOD;
}
