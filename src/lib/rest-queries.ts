import { Query, RestHeader, RestQueryData } from "@/types/connections";

export const convertToHeaders = (headers: any): RestHeader[] => {
  if (!headers) return [];
  return Object.keys(headers).map((key) => {
    return {
      key,
      value: headers[key],
    };
  });
};

export const convertToObject = (headers: RestHeader[]): any => {
  return headers.reduce((acc, header) => {
    return { ...acc, [header.key]: header.value };
  }, {});
};

export const queryToRestQueryData = (query: Query): RestQueryData => {
  return {
    queryId: query.id,
    connectionId: query.connection_id,
    method: query.metadata?.method,
  };
};
