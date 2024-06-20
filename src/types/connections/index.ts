export enum ConnectionType {
  REST = "REST",
  MONGO = "MONGO",
  SQL = "SQL",
}

export interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  credentials: object;
  variables: object;
}

export interface Query {
  id: string;
  name: string;
  connection_id: string;
  metadata: object;
}
