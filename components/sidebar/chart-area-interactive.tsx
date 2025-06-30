"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive area chart"

// const dummyEnrollmentsData = [
//   { date: "2024-06-15", enrollments: 12 },
//   { date: "2024-06-16", enrollments: 24 },
//   { date: "2024-06-17", enrollments: 2 },
//   { date: "2024-06-18", enrollments: 5 },
//   { date: "2024-06-19", enrollments: 63 },
//   { date: "2024-06-20", enrollments: 25 },
//   { date: "2024-06-21", enrollments: 18 },
//   { date: "2024-06-22", enrollments: 30 },
//   { date: "2024-06-23", enrollments: 7 },
//   { date: "2024-06-24", enrollments: 41 },
//   { date: "2024-06-25", enrollments: 15 },
//   { date: "2024-06-26", enrollments: 22 },
//   { date: "2024-06-27", enrollments: 9 },
//   { date: "2024-06-28", enrollments: 33 },
//   { date: "2024-06-29", enrollments: 27 },
//   { date: "2024-06-30", enrollments: 12 },
//   { date: "2024-07-01", enrollments: 19 },
//   { date: "2024-07-02", enrollments: 21 },
//   { date: "2024-07-03", enrollments: 8 },
//   { date: "2024-07-04", enrollments: 26 },
//   { date: "2024-07-05", enrollments: 14 },
//   { date: "2024-07-06", enrollments: 29 },
//   { date: "2024-07-07", enrollments: 11 },
//   { date: "2024-07-08", enrollments: 17 },
//   { date: "2024-07-09", enrollments: 23 },
//   { date: "2024-07-10", enrollments: 6 },
//   { date: "2024-07-11", enrollments: 32 },
//   { date: "2024-07-12", enrollments: 20 },
//   { date: "2024-07-13", enrollments: 13 },
//   { date: "2024-07-14", enrollments: 28 },
//   { date: "2024-07-15", enrollments: 16 },
// ]

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[]
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = React.useMemo(() => data.reduce((acc, curr) => acc + curr.enrollments, 0), [data])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>
          Total Enrollments
        </CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total enrollments for the last 90 days: {totalEnrollmentsNumber}</span>
          <span className="@[540px]/card:hidden">Last 90 days: {totalEnrollmentsNumber}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar
              dataKey={"enrollments"}
              fill="var(--color-enrollments)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
