"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const barData = [
  { month: "Jan", low: 120, medium: 45, high: 12 },
  { month: "Feb", low: 135, medium: 52, high: 15 },
  { month: "Mar", low: 148, medium: 48, high: 18 },
  { month: "Apr", low: 162, medium: 55, high: 14 },
  { month: "May", low: 178, medium: 62, high: 22 },
  { month: "Jun", low: 195, medium: 58, high: 19 },
]

const pieData = [
  { name: "Low Risk", value: 68, color: "hsl(145, 50%, 50%)" },
  { name: "Medium Risk", value: 24, color: "hsl(45, 90%, 55%)" },
  { name: "High Risk", value: 8, color: "hsl(0, 75%, 55%)" },
]

export function RiskChart() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Risk Distribution Over Time</CardTitle>
          <CardDescription>Monthly analysis breakdown by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="low" stackId="a" fill="hsl(145, 50%, 50%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="medium" stackId="a" fill="hsl(45, 90%, 55%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="high" stackId="a" fill="hsl(0, 75%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-success" />
              <span className="text-sm text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-warning" />
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-emergency" />
              <span className="text-sm text-muted-foreground">High</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Overall Risk Distribution</CardTitle>
          <CardDescription>Percentage of cases by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">
                  {item.name}: <span className="font-semibold">{item.value}%</span>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
