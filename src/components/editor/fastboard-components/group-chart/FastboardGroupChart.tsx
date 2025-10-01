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
  YAxis,
} from "recharts";
import CustomSkeleton from "@/components/shared/CustomSkeleton";
import { DisplayKey, FastboardGroupChartProperties } from "@/types/editor/group-chart-types";
import useData from "@/hooks/useData";
import { ComponentId, ComponentType } from "@/types/editor";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { propertiesDrawerState } from "@/atoms/editor";
import { useTheme } from "next-themes";
import { generatePalette } from "@/lib/colors";

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

const prepareData = (
  groupChartData: any,
  customDisplayKey: string | null,
  customDisplayKeyLabel: string | null,
  displayKeys: DisplayKey[] = []
) => {
  // Si hay múltiples displayKeys configurados, usar esos
  if (displayKeys && displayKeys.length > 0) {
    return Object.keys(groupChartData).map((key) => {
      const result: any = { label: key };
      displayKeys.forEach((dk) => {
        result[dk.label] = groupChartData[key].reduce((acc: any, item: any) => {
          return acc + (item[dk.key] || 0);
        }, 0);
      });
      return result;
    });
  }
  // Mantener retrocompatibilidad con customDisplayKey
  else if (customDisplayKey) {
    return Object.keys(groupChartData).map((key) => {
      return {
        [customDisplayKeyLabel || customDisplayKey]: groupChartData[key].reduce((acc: any, item: any) => {
          return acc + item[customDisplayKey];
        }, 0),
        label: key,
      };
    });
  }
  // Fallback a count
  else {
    return Object.keys(groupChartData).map((key) => {
      return {
        count: groupChartData[key].length,
        label: key,
      };
    });
  }
}

const BarChartComponent = ({
  chartConfig,
  groupBy,
  countedData,
  minimizedLabels,
  theme,
  barsColor,
  customDisplayKey,
  customDisplayKeyLabel,
  showBarYAxis,
  displayKeys,
}: {
  chartConfig: ChartConfig;
  groupBy: string;
  countedData: any[];
  minimizedLabels: boolean;
  theme: string | undefined;
  barsColor: { light: string; dark: string };
  customDisplayKey: string | null;
  customDisplayKeyLabel: string | null;
  showBarYAxis: boolean;
  displayKeys: DisplayKey[];
}) => {
  // Determinar qué barras renderizar
  const barsToRender = displayKeys.length > 0
    ? displayKeys
    : [{
        key: customDisplayKey || "count",
        label: customDisplayKeyLabel || customDisplayKey || "count",
        color: barsColor,
      }];

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
        {showBarYAxis && (
          <YAxis
            tickLine={false}
            tickMargin={20}
            width={50}
            axisLine={false}
          />
        )}

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {barsToRender.map((bar, index) => {
          const barColor = bar.color
            ? theme === "light"
              ? bar.color.light
              : bar.color.dark
            : theme === "light"
            ? barsColor.light
            : barsColor.dark;

          return (
            <Bar
              key={bar.label + index}
              dataKey={bar.label}
              fill={barColor}
              radius={8}
            />
          );
        })}
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
  customDisplayKey,
  customDisplayKeyLabel,
}: {
  countedData: any[];
  groupBy: string;
  minimizedLabels: boolean;
  theme: string | undefined;
  barsColor: { light: string; dark: string };
  customDisplayKey: string | null;
  customDisplayKeyLabel: string | null;
}) => {
  const filteredCountedData = countedData.filter((data) => data[customDisplayKeyLabel || customDisplayKey || "count"] > 0);
  const pieChartConfig = Object.values(filteredCountedData).reduce((acc, item) => {
    return {
      ...acc,
      [item.label]: {
        label: item.label,
        color: "hsl(var(--chart-1))",
      },
    };
  }, {}) satisfies ChartConfig;

  const baseColor = theme === "light" ? barsColor.light : barsColor.dark;

  const paletteSize = Object.keys(filteredCountedData).length;
  
  const palette = generatePalette(baseColor, paletteSize);

  return (
    <div className={"w-full h-full"}>
      <ChartContainer config={pieChartConfig} className={"w-full h-full"}>
        <PieChart>
          <Pie
            className={"w-1/2"}
            data={
              groupBy
                ? filteredCountedData.map((data, index) => {
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
                          {Math.round(filteredCountedData[index][customDisplayKeyLabel || customDisplayKey || "count"])}
                        </text>
                    );
                  }
                : undefined
            }
            dataKey={customDisplayKeyLabel || customDisplayKey || "count"}
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
                        {filteredCountedData.reduce((acc, item) => acc + item[customDisplayKeyLabel || customDisplayKey || "count"], 0).toFixed(2)}
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
    customDisplayKey,
    customDisplayKeyLabel,
    showBarYAxis,
    displayKeys = [],
    pollable = false,
    pollInterval = 1,
  } = properties;
  const setProperties = useSetRecoilState(propertiesDrawerState);
  const propertiesDrawer = useRecoilValue(propertiesDrawerState);

  const isSelected = propertiesDrawer.selectedComponentId === id;

  const {
    data,
    keys,
    isLoading: dataLoading,
    isError: isDataError,
    refetch,
  } = useData(`${ComponentType.GroupChart}-${id}`, sourceQueryData);

  useEffect(() => {
    if (keys && isSelected) {
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
  }, [keys, isSelected]);

  useEffect(() => {
    if (pollable && pollInterval && sourceQueryData) {
      const intervalMs = pollInterval * 60 * 1000; // Convert minutes to milliseconds
      const intervalId = setInterval(() => {
        refetch();
      }, intervalMs);

      return () => clearInterval(intervalId);
    }
  }, [pollable, pollInterval, sourceQueryData, refetch]);

  const chartConfig = {
    [groupBy]: {
      label: groupBy,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const groupChartData = groupData(data, groupBy);

  const countedData = prepareData(
    groupChartData,
    customDisplayKey,
    customDisplayKeyLabel,
    displayKeys
  );
  

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
          isLoaded={!dataLoading}
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
              customDisplayKey={customDisplayKey}
              customDisplayKeyLabel={customDisplayKeyLabel}
              showBarYAxis={showBarYAxis}
              displayKeys={displayKeys}
            />
          )}
          {layout === "pie" && (
            <PieChartComponent
              groupBy={groupBy}
              countedData={countedData}
              minimizedLabels={minimizedLabels}
              theme={theme}
              barsColor={barsColor}
              customDisplayKey={customDisplayKey}
              customDisplayKeyLabel={customDisplayKeyLabel}
            />
          )}
        </CustomSkeleton>

        {!dataLoading && data.length === 0 && (
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
        {!dataLoading && data.length > 0 && !groupBy && (
          <p className={"absolute self-center top-0 bottom-0 text-2xl"}>
            Please select a group key
          </p>
        )}
      </div>
    </div>
  );
};

export default FastboardGroupChart;
