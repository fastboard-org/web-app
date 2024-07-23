import { axiosInstance } from "@/lib/axios";
import { Connection, ConnectionType, Query } from "@/types/connections";

const mapConnection = (connection: any): Connection => {
  return {
    id: connection._id,
    name: connection.name,
    type: connection.type,
    credentials: connection.credentials,
    variables: connection.variables,
  };
};

const mapQuery = (query: any): Query => {
  return {
    id: query._id,
    name: query.name,
    connection_id: query.connection_id,
    metadata: query.metadata,
  };
};

const getConnections = async () => {
  const response = await axiosInstance.get("/connections/me");
  return response.data.map(mapConnection);
};

const createConnection = async (
  name: string,
  type: ConnectionType,
  credentials: any,
) => {
  const response = await axiosInstance.post("/connections", {
    name,
    type,
    credentials,
    variables: {},
  });
  return mapConnection(response.data);
};

const getConnection = async (id: string) => {
  const response = await axiosInstance.get(`/connections/${id}`);
  console.log(response.data);
  return mapConnection(response.data);
};

const updateConnection = async (
  id: string,
  name: string,
  credentials: any,
  variables: any,
) => {
  const response = await axiosInstance.patch(`/connections/${id}`, {
    name,
    credentials,
    variables,
  });
  return mapConnection(response.data);
};

const deleteConnection = async (id: string) => {
  await axiosInstance.delete(`/connections/${id}`);
};

const getQueriesByConnectionId = async (connectionId: string) => {
  const response = await axiosInstance.get(
    `/queries/me?connection_id=${connectionId}`,
  );
  return response.data.map(mapQuery);
};

const createQuery = async (
  name: string,
  connection_id: string,
  metadata: any,
) => {
  const response = await axiosInstance.post("/queries", {
    name,
    connection_id,
    metadata,
  });
  return mapQuery(response.data);
};

const updateQuery = async (id: string, name: string, metadata: any) => {
  const response = await axiosInstance.patch(`/queries/${id}`, {
    name,
    metadata,
  });
  return mapQuery(response.data);
};

const deleteQuery = async (id: string) => {
  await axiosInstance.delete(`/queries/${id}`);
};

export const connectionsService = {
  getConnections,
  createConnection,
  getConnection,
  updateConnection,
  deleteConnection,
  getQueriesByConnectionId,
  createQuery,
  updateQuery,
  deleteQuery,
};