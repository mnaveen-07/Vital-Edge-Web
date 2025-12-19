import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const alerts = [
  {
    id: 1,
    patient: "Patient #2847",
    condition: "Cardiac Symptoms",
    time: "5 min ago",
    status: "sent",
    riskLevel: "high",
  },
  {
    id: 2,
    patient: "Patient #2846",
    condition: "Respiratory Distress",
    time: "12 min ago",
    status: "acknowledged",
    riskLevel: "high",
  },
  {
    id: 3,
    patient: "Patient #2845",
    condition: "High Fever",
    time: "28 min ago",
    status: "resolved",
    riskLevel: "medium",
  },
  {
    id: 4,
    patient: "Patient #2844",
    condition: "Severe Headache",
    time: "1 hour ago",
    status: "resolved",
    riskLevel: "medium",
  },
  {
    id: 5,
    patient: "Patient #2843",
    condition: "Chest Pain",
    time: "2 hours ago",
    status: "resolved",
    riskLevel: "high",
  },
]

export function RecentAlerts() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "sent":
        return { icon: Bell, color: "bg-warning text-warning-foreground", label: "Sent" }
      case "acknowledged":
        return { icon: Clock, color: "bg-primary text-primary-foreground", label: "Acknowledged" }
      case "resolved":
        return { icon: CheckCircle, color: "bg-success text-success-foreground", label: "Resolved" }
      default:
        return { icon: Bell, color: "bg-muted", label: "Unknown" }
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Recent Emergency Alerts
        </CardTitle>
        <CardDescription>Latest emergency triggers and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const statusConfig = getStatusConfig(alert.status)
            const StatusIcon = statusConfig.icon
            return (
              <div key={alert.id} className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      alert.riskLevel === "high" ? "bg-emergency/10" : "bg-warning/10"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 ${alert.riskLevel === "high" ? "text-emergency" : "text-warning"}`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{alert.patient}</p>
                    <p className="text-sm text-muted-foreground">{alert.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{alert.time}</span>
                  <Badge className={statusConfig.color}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
