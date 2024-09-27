import {
  Query,
  RestFormDataParameter,
  RestHeader,
  QueryData,
  ContentType,
} from "@/types/connections";

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

export const convertToFormData = (
  formDataBody: any
): RestFormDataParameter[] => {
  if (!formDataBody) return [];
  return Object.keys(formDataBody).map((key) => {
    return {
      key,
      value: formDataBody[key],
    };
  });
};

export const formDataToObject = (formData: RestFormDataParameter[]): any => {
  return formData.reduce((acc, param) => {
    if (param.key === "") return acc;
    return { ...acc, [param.key]: param.value };
  }, {});
};

export const queryToQueryData = (query: Query): QueryData => {
  return {
    queryId: query.id,
    connectionId: query.connection_id,
    method: query.metadata?.method,
    contentType: query.metadata?.contentType || ContentType.JSON,
  };
};
