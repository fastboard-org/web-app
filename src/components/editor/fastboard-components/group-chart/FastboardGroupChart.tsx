import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import useData from "@/hooks/useData";
import { ComponentId, ComponentType } from "@/types/editor";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";

const groupData = (data: any[], groupBy: string) => {
  return data.reduce((acc, item) => {
    const key = item[groupBy];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

const FastboardGroupChart = ({
  id,
  layoutIndex,
  container,
  properties,
}: {
  id: ComponentId;
  layoutIndex?: number;
  container?: string;
  properties: FastboardGroupChartProperties;
}) => {
  const {
    sourceQuery,
    title,
    subtitle,
    groupBy,
    emptyMessage,
    minimizedLabels,
  } = properties;
  const setProperties = useSetRecoilState(propertiesDrawerState);

  const {
    data,
    keys,
    isFetching: dataFetching,
    isError: isDataError,
  } = useData(
    `${ComponentType.GroupChart}-${id}`,
    sourceQuery,
    Number.MAX_VALUE
  );

  useEffect(() => {
    if (keys) {
      setProperties((prev) => {
        return {
          ...prev,
          properties: {
            ...prev.properties,
            keys,
          },
        };
      });
    }
  }, [keys]);

  const chartConfig = {
    desktop: {
      label: groupBy,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const groupChartData = groupData(data, groupBy);

  const countedData = Object.keys(groupChartData).map((key) => {
    return {
      count: groupChartData[key].length,
      label: key,
    };
  });

  return (
    <div className={"w-full h-full"}>
      <div
        className={"w-full h-full flex flex-col p-3 relative justify-between"}
      >
        <div className={"flex mb-2 gap-1 flex-col h-[65px]"}>
          <h3 className={"text-4xl"}>{title}</h3>
          <h4 className={"opacity-40 italic"}>{subtitle}</h4>
        </div>
        <CustomSkeleton
          isLoaded={!dataFetching}
          className={"w-full h-[calc(100%-65px)] rounded-xl"}
          onlyRenderOnLoad
        >
          <ChartContainer config={chartConfig} className={"w-full h-full"}>
            <BarChart accessibilityLayer data={groupBy ? countedData : []}>
              <CartesianGrid
                vertical={false}
                stroke={"hsl(var(--nextui-foreground-400))"}
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey={"label"}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={
                  minimizedLabels
                    ? (value) => value.slice(0, 5) + "..."
                    : undefined
                }
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CustomSkeleton>

        {!dataFetching && data.length === 0 && (
          <div
            className={
              "absolute self-center top-0 bottom-0 text-2xl text-center"
            }
          >
            <p>{emptyMessage}</p>
            {isDataError && (
              <p className={"text-danger"}>Error while fetching data</p>
            )}
          </div>
        )}
        {!dataFetching && data.length > 0 && !groupBy && (
          <p className={"absolute self-center top-0 bottom-0 text-2xl"}>
            Please select a group key
          </p>
        )}
      </div>
    </div>
  );
};

export default FastboardGroupChart;
