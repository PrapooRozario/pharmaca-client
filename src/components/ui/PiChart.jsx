"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#ffef66", // Light yellow
  },
  paid: {
    label: "Paid",
    color: "#6bff9c", // Light green
  },
};

export default function PaymentPieChart({ data }) {
  const chartData = [
    {
      name: "Pending",
      value: data?.totalPendingAmount || 0,
      fill: chartConfig.pending.color,
    },
    {
      name: "Paid",
      value: data?.totalPaidAmount || 0,
      fill: chartConfig.paid.color,
    },
  ];

  const totalAmount =
    (data?.totalPendingAmount || 0) + (data?.totalPaidAmount || 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Payment Status
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Payment distribution overview
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={85}
              strokeWidth={0}
              paddingAngle={2}
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
                          className="text-gray-900 dark:text-gray-100 text-2xl font-bold"
                        >
                          ${totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-gray-500 dark:text-gray-00 text-sm"
                        >
                          Total Amount
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
