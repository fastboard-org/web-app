import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { ComponentType } from "@/types/editor";
import Draggable from "../Draggable";
import { FormProperties } from "@/types/editor/form";

export default function FastboardFormDraggable() {
  return (
    <div className="flex flex-col justify-center">
      <h4 className={"text-md pb-2"}>Form</h4>
      <Draggable
        id="form-draggable"
        data={{
          type: ComponentType.Form,
          defaultProperties: FormProperties.default(),
        }}
        dragSnapToOrigin
      >
        <Card>
          <CardHeader></CardHeader>
          <Divider />
          <CardBody>
            <Input disabled variant="bordered" />
            <Input disabled type="password" variant="bordered" />
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end h-10">
            <Button color="primary" className="h-5"></Button>
          </CardFooter>
        </Card>
      </Draggable>
    </div>
  );
}
