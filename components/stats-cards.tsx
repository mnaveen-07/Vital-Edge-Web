import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Users, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Analyses",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    description: "This month",
  },
  {
    title: "High-Risk Cases",
    value: "142",
    change: "+3.2%",
    trend: "up",
    icon: AlertTriangle,
    description: "Requiring attention",
  },
  {
    title: "Emergency Triggers",
    value: "28",
    change: "-8.1%",
    trend: "down",
    icon: Users,
    description: "This month",
  },
  {
    title: "Avg. Confidence",
    value: "87.3%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
    description: "AI accuracy",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-emergency" />
              )}
              <span className={`text-xs ${stat.trend === "up" ? "text-success" : "text-emergency"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
