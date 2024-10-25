import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import useData from "@/hooks/useData";
import { ComponentId, ComponentType } from "@/types/editor";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { useTheme } from "next-themes";
import { generatePalette } from "@/lib/colors";
import { Card } from "@nextui-org/react";

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

const BarChartComponent = ({
  chartConfig,
  groupBy,
  countedData,
  minimizedLabels,
  theme,
  barsColor,
}: {
  chartConfig: ChartConfig;
  groupBy: string;
  countedData: any[];
  minimizedLabels: boolean;
  theme: string | undefined;
  barsColor: { light: string; dark: string };
}) => {
  return (
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
            minimizedLabels ? (value) => value.slice(0, 5) + "..." : undefined
          }
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="count"
          fill={theme === "light" ? barsColor.light : barsColor.dark}
          radius={8}
        />
      </BarChart>
    </ChartContainer>
  );
};

const PieChartComponent = ({
  countedData,
  groupBy,
  minimizedLabels,
  theme,
  barsColor,
}: {
  countedData: any[];
  groupBy: string;
  minimizedLabels: boolean;
  theme: string | undefined;
  barsColor: { light: string; dark: string };
}) => {
  const pieChartConfig = Object.values(countedData).reduce((acc, item) => {
    return {
      ...acc,
      [item.label]: {
        label: item.label,
        color: "hsl(var(--chart-1))",
      },
    };
  }, {}) satisfies ChartConfig;

  const baseColor = theme === "light" ? barsColor.light : barsColor.dark;

  const paletteSize = Object.keys(countedData).length;

  const palette = generatePalette(baseColor, paletteSize);

  return (
    <div className={"w-full h-full"}>
      <ChartContainer config={pieChartConfig} className={"w-full h-full"}>
        <PieChart>
          <Pie
            className={"w-1/2"}
            data={
              groupBy
                ? countedData.map((data, index) => {
                    return {
                      ...data,
                      fill: palette[index],
                    };
                  })
                : []
            }
            paddingAngle={1}
            label={
              !minimizedLabels
                ? ({ cx, cy, midAngle, outerRadius, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 1.15;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fontSize={16}
                        fill="currentColor"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {countedData[index].count}
                      </text>
                    );
                  }
                : undefined
            }
            dataKey="count"
            nameKey={"label"}
            innerRadius={"50%"}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-5xl"
                      >
                        {countedData.reduce((acc, item) => acc + item.count, 0)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 35}
                        className="fill-foreground text-lg"
                      >
                        Total
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey={"label"} />}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

const FastboardGroupChart = ({
  id,
  properties,
}: {
  id: ComponentId;
  layoutIndex?: number;
  container?: string;
  properties: FastboardGroupChartProperties;
}) => {
  const { theme } = useTheme();
  const {
    sourceQueryData,
    title,
    subtitle,
    groupBy,
    emptyMessage,
    minimizedLabels,
    barsColor,
    layout,
  } = properties;
  const setProperties = useSetRecoilState(propertiesDrawerState);

  const {
    data,
    keys,
    isFetching: dataFetching,
    isError: isDataError,
  } = useData(`${ComponentType.GroupChart}-${id}`, sourceQueryData);

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
    [groupBy]: {
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
          {layout === "bar" && (
            <BarChartComponent
              chartConfig={chartConfig}
              groupBy={groupBy}
              countedData={countedData}
              minimizedLabels={minimizedLabels}
              theme={theme}
              barsColor={barsColor}
            />
          )}
          {layout === "pie" && (
            <PieChartComponent
              groupBy={groupBy}
              countedData={countedData}
              minimizedLabels={minimizedLabels}
              theme={theme}
              barsColor={barsColor}
            />
          )}
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
