import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle2, Clock, AlertTriangle, XCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    id: 1,
    type: "emergency",
    title: "Emergency Alert Triggered",
    description: "High-risk cardiac symptoms detected. Emergency contacts and nearby hospitals notified.",
    time: "5 minutes ago",
    status: "sent",
  },
  {
    id: 2,
    type: "emergency",
    title: "Emergency Response Acknowledged",
    description: "Metro Emergency Center has acknowledged your emergency alert.",
    time: "4 minutes ago",
    status: "acknowledged",
  },
  {
    id: 3,
    type: "system",
    title: "Analysis Complete",
    description: "Your symptom analysis has been completed. Risk level: Medium.",
    time: "1 hour ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "emergency",
    title: "Emergency Resolved",
    description: "Your emergency alert has been resolved. Medical assistance provided.",
    time: "2 hours ago",
    status: "resolved",
  },
  {
    id: 5,
    type: "system",
    title: "Weekly Health Summary",
    description: "Your weekly health report is ready to view.",
    time: "1 day ago",
    status: "resolved",
  },
  {
    id: 6,
    type: "reminder",
    title: "Follow-up Reminder",
    description: "Based on your last analysis, we recommend a follow-up check.",
    time: "2 days ago",
    status: "pending",
  },
]

export default function AlertsPage() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "sent":
        return { icon: Bell, color: "bg-warning text-warning-foreground", label: "Sent" }
      case "acknowledged":
        return { icon: Clock, color: "bg-primary text-primary-foreground", label: "Acknowledged" }
      case "resolved":
        return { icon: CheckCircle2, color: "bg-success text-success-foreground", label: "Resolved" }
      case "pending":
        return { icon: Clock, color: "bg-muted text-muted-foreground", label: "Pending" }
      case "failed":
        return { icon: XCircle, color: "bg-emergency text-emergency-foreground", label: "Failed" }
      default:
        return { icon: Bell, color: "bg-muted", label: "Unknown" }
    }
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "emergency":
        return { icon: AlertTriangle, bgColor: "bg-emergency/10", iconColor: "text-emergency" }
      case "system":
        return { icon: Bell, bgColor: "bg-primary/10", iconColor: "text-primary" }
      case "reminder":
        return { icon: Clock, bgColor: "bg-warning/10", iconColor: "text-warning" }
      default:
        return { icon: Bell, bgColor: "bg-muted", iconColor: "text-muted-foreground" }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 max-w-3xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Alerts & Notifications</h1>
            <p className="mt-2 text-muted-foreground">
              View your emergency alerts, system notifications, and reminders.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button variant="default" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <AlertTriangle className="mr-1.5 h-4 w-4 text-emergency" />
              Emergency
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Bell className="mr-1.5 h-4 w-4" />
              System
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Clock className="mr-1.5 h-4 w-4" />
              Reminders
            </Button>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>{alerts.length} notifications</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="mr-1.5 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => {
                  const statusConfig = getStatusConfig(alert.status)
                  const typeConfig = getTypeConfig(alert.type)
                  const StatusIcon = statusConfig.icon
                  const TypeIcon = typeConfig.icon

                  return (
                    <div key={alert.id} className="flex items-start gap-4 rounded-lg border bg-card p-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${typeConfig.bgColor}`}>
                        <TypeIcon className={`h-5 w-5 ${typeConfig.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold">{alert.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          </div>
                          <Badge className={statusConfig.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
