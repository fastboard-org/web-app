import {
  CardComponentProperties,
  CardComponentType,
  DefaultCardComponentProperties,
  ImageComponentProperties,
  LinkComponentProperties,
  SpacerComponentProperties,
  TextComponentProperties,
  VideoComponentProperties,
} from "@/types/editor/card-types";
import CardTextComponentProperties from "./CardTextComponentProperties";
import { Select, SelectItem } from "@nextui-org/react";
import CardComponentIcon from "./CardComponentIcon";
import CardImageComponentProperties from "./CardImageComponentProperties";
import CardLinkComponentProperties from "./CardLinkComponentProperties";
import CardVideoComponentProperties from "./CardVideoComponentProperties";
import CardSpacerComponentProperties from "./CardSpacerComponentProperties";

export default function CardComponent({
  component,
  dataKeys,
  onComponentChange,
}: {
  component: CardComponentProperties;
  dataKeys: string[];
  onComponentChange: (componentProperties: CardComponentProperties) => void;
}) {
  const { type } = component;

  function changeComponentType(
    type: CardComponentType
  ): CardComponentProperties {
    const newProperties = DefaultCardComponentProperties.of(type);
    return {
      ...newProperties,
    };
  }

  return (
    <div className="flex flex-col gap-2">
      <Select
        label="Component type"
        labelPlacement="outside"
        selectedKeys={[type]}
        startContent={<CardComponentIcon type={type} size={15} />}
        onChange={(e) => {
          onComponentChange(
            changeComponentType(e.target.value as CardComponentType)
          );
        }}
      >
        {Object.values(CardComponentType).map((type) => (
          <SelectItem
            key={type}
            startContent={<CardComponentIcon type={type} size={15} />}
          >
            {type}
          </SelectItem>
        ))}
      </Select>

      {type === CardComponentType.Text && (
        <CardTextComponentProperties
          properties={component as TextComponentProperties}
          dataKeys={dataKeys}
          onValueChange={(component) => {
            onComponentChange(component);
          }}
        />
      )}
      {type === CardComponentType.Image && (
        <CardImageComponentProperties
          properties={component as ImageComponentProperties}
          dataKeys={dataKeys}
          onValueChange={(component) => {
            onComponentChange(component);
          }}
        />
      )}
      {type === CardComponentType.Link && (
        <CardLinkComponentProperties
          properties={component as LinkComponentProperties}
          dataKeys={dataKeys}
          onValueChange={(component) => {
            onComponentChange(component);
          }}
        />
      )}
      {type === CardComponentType.Video && (
        <CardVideoComponentProperties
          properties={component as VideoComponentProperties}
          dataKeys={dataKeys}
          onValueChange={(component) => {
            onComponentChange(component);
          }}
        />
      )}
      {type === CardComponentType.Spacer && (
        <CardSpacerComponentProperties
          properties={component as SpacerComponentProperties}
          dataKeys={dataKeys}
          onValueChange={(component) => {
            onComponentChange(component);
          }}
        />
      )}
    </div>
  );
}
