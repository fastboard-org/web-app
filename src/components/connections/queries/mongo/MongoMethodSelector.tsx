import { MONGO_METHOD } from "@/types/connections";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { methodColor } from "@/lib/mongo-methods";

const sections = [
  {
    title: "Aggregation",
    methods: [
      MONGO_METHOD.AGGREGATE,
      MONGO_METHOD.COUNT,
      MONGO_METHOD.DISTINCT,
    ],
  },
  {
    title: "Query",
    methods: [
      MONGO_METHOD.FIND,
      MONGO_METHOD.FIND_ONE,
      MONGO_METHOD.FIND_ONE_AND_DELETE,
      MONGO_METHOD.FIND_ONE_AND_REPLACE,
      MONGO_METHOD.FIND_ONE_AND_UPDATE,
    ],
  },
  {
    title: "Insert",
    methods: [MONGO_METHOD.INSERT_ONE, MONGO_METHOD.INSERT_MANY],
  },
  {
    title: "Update",
    methods: [MONGO_METHOD.UPDATE_ONE, MONGO_METHOD.UPDATE_MANY],
  },
  {
    title: "Delete",
    methods: [MONGO_METHOD.DELETE_ONE, MONGO_METHOD.DELETE_MANY],
  },
  {
    title: "AI",
    methods: [MONGO_METHOD.VECTOR_SEARCH],
  },
];

const MongoMethodSelector = ({
  method,
  onMethodChange,
}: {
  method: MONGO_METHOD;
  onMethodChange: (method: MONGO_METHOD) => void;
}) => {
  return (
    <Select
      className={`w-1/4 min-w-[250px]`}
      aria-label={"Method"}
      placeholder={"Method"}
      selectedKeys={[method]}
      disallowEmptySelection
      onChange={(e) => onMethodChange(e.target.value as MONGO_METHOD)}
      classNames={{
        value: `text-${methodColor(method)} group-data-[has-value=true]:text-${methodColor(method)}`,
      }}
    >
      {sections.map((section) => (
        <SelectSection key={section.title} title={section.title}>
          {section.methods.map((method) => (
            <SelectItem
              key={method}
              value={method}
              className={`text-${methodColor(method)} data-[selectable=true]:focus:text-${methodColor(method)}`}
            >
              {method}
            </SelectItem>
          ))}
        </SelectSection>
      ))}
    </Select>
  );
};

export default MongoMethodSelector;
