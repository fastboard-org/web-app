import { MONGO_METHOD } from "@/types/connections";

export const methodColor = (method: MONGO_METHOD) => {
  const colors = {
    [MONGO_METHOD.AGGREGATE]: "secondary",
    [MONGO_METHOD.COUNT]: "secondary",
    [MONGO_METHOD.DELETE_ONE]: "danger",
    [MONGO_METHOD.DELETE_MANY]: "danger",
    [MONGO_METHOD.DISTINCT]: "secondary",
    [MONGO_METHOD.FIND]: "success",
    [MONGO_METHOD.FIND_AND_MODIFY]: "primary",
    [MONGO_METHOD.FIND_ONE]: "success",
    [MONGO_METHOD.FIND_ONE_AND_DELETE]: "danger",
    [MONGO_METHOD.FIND_ONE_AND_REPLACE]: "primary",
    [MONGO_METHOD.FIND_ONE_AND_UPDATE]: "primary",
    [MONGO_METHOD.INSERT_ONE]: "warning",
    [MONGO_METHOD.INSERT_MANY]: "warning",
    [MONGO_METHOD.UPDATE_ONE]: "primary",
    [MONGO_METHOD.UPDATE_MANY]: "primary",
    [MONGO_METHOD.VECTOR_SEARCH]: "primary-700",
  };

  return colors[method];
};

export const methodHasUpdateBody = (method: MONGO_METHOD) => {
  return [
    MONGO_METHOD.FIND_AND_MODIFY,
    MONGO_METHOD.FIND_ONE_AND_REPLACE,
    MONGO_METHOD.FIND_ONE_AND_UPDATE,
    MONGO_METHOD.UPDATE_ONE,
    MONGO_METHOD.UPDATE_MANY,
  ].includes(method);
};
