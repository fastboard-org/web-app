import {
  HTTP_METHOD,
  MONGO_METHOD,
  Query,
  QueryMethod,
  QueryType,
} from "@/types/connections";

export const isValidBody = (body: string) => {
  if (!body) return true;
  try {
    JSON.parse(body);
    return true;
  } catch (e) {
    return false;
  }
};

export const getQueryType = (query: Query) => {
  const method = query?.metadata?.method as QueryMethod;

  const GET_METHODS = [
    HTTP_METHOD.GET,
    MONGO_METHOD.FIND,
    MONGO_METHOD.FIND_ONE,
    MONGO_METHOD.AGGREGATE,
    MONGO_METHOD.DISTINCT,
    MONGO_METHOD.COUNT,
  ];

  const UPDATE_METHODS = [
    HTTP_METHOD.PUT,
    HTTP_METHOD.PATCH,
    HTTP_METHOD.POST,
    HTTP_METHOD.DELETE,
    MONGO_METHOD.UPDATE_ONE,
    MONGO_METHOD.UPDATE_MANY,
    MONGO_METHOD.INSERT_ONE,
    MONGO_METHOD.INSERT_MANY,
    MONGO_METHOD.DELETE_ONE,
    MONGO_METHOD.DELETE_MANY,
    MONGO_METHOD.FIND_AND_MODIFY,
    MONGO_METHOD.FIND_ONE_AND_DELETE,
    MONGO_METHOD.FIND_ONE_AND_REPLACE,
    MONGO_METHOD.FIND_ONE_AND_UPDATE,
  ];

  const AI_METHODS: QueryMethod[] = [MONGO_METHOD.VECTOR_SEARCH];

  if (GET_METHODS.includes(method)) return QueryType.GET;
  if (UPDATE_METHODS.includes(method)) return QueryType.UPDATE;
  if (AI_METHODS.includes(method)) return QueryType.AI;

  return null;
};
