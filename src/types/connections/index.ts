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

export enum MONGO_METHOD {
  AGGREGATE = "aggregate",
  COUNT = "count",
  DELETE_ONE = "deleteOne",
  DELETE_MANY = "deleteMany",
  DISTINCT = "distinct",
  FIND = "find",
  FIND_AND_MODIFY = "findAndModify",
  FIND_ONE = "findOne",
  FIND_ONE_AND_DELETE = "findOneAndDelete",
  FIND_ONE_AND_REPLACE = "findOneAndReplace",
  FIND_ONE_AND_UPDATE = "findOneAndUpdate",
  INSERT_ONE = "insertOne",
  INSERT_MANY = "insertMany",
  UPDATE_ONE = "updateOne",
  UPDATE_MANY = "updateMany",
}
