export enum ConnectionType {
  REST = "REST",
  MONGO = "MONGO",
  SQL = "SQL",
}

export interface ConnectionInterface {
  id: string;
  name: string;
  type: ConnectionType;
  credentials: object;
  variables: object;
}

export interface QueryInterface {
  id: string;
  name: string;
  connection_id: string;
  metadata: object;
}
