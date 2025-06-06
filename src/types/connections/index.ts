export enum ConnectionType {
  REST = "REST",
  MONGO = "MONGO",
  SQL = "SQL",
}

export enum ContentType {
  JSON = "application/json",
  FORM_DATA = "multipart/form-data",
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
  type: "text" | "file";
  preview: string | File | null;
}

export interface RestHeader {
  key: string;
  value: string;
}

export interface RestFormDataParameter {
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

export type QueryMethod = HTTP_METHOD | MONGO_METHOD;

export interface QueryData {
  queryId: string;
  connectionId: string;
  method: QueryMethod;
  contentType: ContentType;
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
  VECTOR_SEARCH = "vectorSearch",
}

export interface MongoQueryMetadata {
  method: MONGO_METHOD;
  collection: string;
  filter_body: any;
  update_body: any;
}

export interface MongoVectorSearchMetadata {
  method: MONGO_METHOD.VECTOR_SEARCH;
  collection: string;
  index_created: boolean;
  embeddings_created: boolean;
  query: string;
  limit: number;
  num_candidates: number;
}

export interface RestQueryMetadata {
  method: HTTP_METHOD;
  path: string;
  headers: RestHeader[];
  contentType: ContentType;
  body: any;
}

export enum QueryType {
  GET = "GET",
  UPDATE = "UPDATE",
  AI = "AI",
}
