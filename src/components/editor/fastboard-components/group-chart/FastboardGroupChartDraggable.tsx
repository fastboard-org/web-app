import React from "react";
import { ComponentType } from "@/types/editor";
import Draggable from "@/components/editor/fastboard-components/Draggable";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid } from "recharts";
import { Card } from "@nextui-org/react";
import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";

const chartData = [
  { value: 186 },
  { value: 305 },
  { value: 237 },
  { value: 73 },
  { value: 209 },
  { value: 214 },
  { value: 186 },
  { value: 305 },
  { value: 237 },
  { value: 73 },
  { value: 209 },
  { value: 214 },
  { value: 186 },
  { value: 305 },
];

const chartConfig = {
  desktop: {
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function FastboardGroupChartDraggable() {
  return (
    <div className="flex flex-col justify-center ">
      <h4 className={"text-md pb-2"}>Group Chart</h4>
      <Draggable
        id="group-chart-draggable"
        data={{
          type: ComponentType.GroupChart,
          defaultProperties: FastboardGroupChartProperties.default(),
        }}
        dragSnapToOrigin
      >
        <Card className={"p-2 h-[20%]"}>
          <ChartContainer config={chartConfig} className={"h-[100px] w-full "}>
            <BarChart
              accessibilityLayer
              data={chartData}
              style={{
                cursor: "unset",
              }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <Bar
                dataKey="value"
                fill="var(--color-desktop)"
                radius={100}
                className={"w-1"}
              />
            </BarChart>
          </ChartContainer>
        </Card>
      </Draggable>
    </div>
  );
}
