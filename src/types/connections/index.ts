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
