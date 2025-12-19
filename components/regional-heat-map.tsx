import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const regions = [
  { name: "Urban North", cases: 456, highRisk: 23, color: "bg-success/60" },
  { name: "Urban South", cases: 389, highRisk: 18, color: "bg-success/40" },
  { name: "Rural North", cases: 234, highRisk: 31, color: "bg-warning/60" },
  { name: "Rural South", cases: 198, highRisk: 28, color: "bg-warning/40" },
  { name: "Remote Areas", cases: 87, highRisk: 42, color: "bg-emergency/50" },
]

export function RegionalHeatMap() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Regional Risk Heat Map</CardTitle>
        <CardDescription>High-risk case distribution by region</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regions.map((region, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg ${region.color} flex items-center justify-center`}>
                <span className="text-sm font-bold">{region.highRisk}%</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{region.name}</span>
                  <Badge variant="secondary">{region.cases} cases</Badge>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${region.highRisk > 35 ? "bg-emergency" : region.highRisk > 25 ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${region.highRisk}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk Scale:</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-success" />
                <span className="text-muted-foreground">{"<25%"}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-warning" />
                <span className="text-muted-foreground">25-35%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-sm bg-emergency" />
                <span className="text-muted-foreground">{">35%"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
