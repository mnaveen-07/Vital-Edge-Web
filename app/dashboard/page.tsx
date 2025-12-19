import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RiskChart } from "@/components/dashboard/risk-chart"
import { RegionalHeatMap } from "@/components/dashboard/regional-heat-map"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
              <LayoutDashboard className="h-4 w-4" />
              <span className="text-sm font-medium">Admin Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Analytics Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Monitor health analyses, emergency triggers, and regional risk distribution.
            </p>
          </div>

          <div className="space-y-8">
            <StatsCards />
            <RiskChart />
            <div className="grid gap-6 lg:grid-cols-2">
              <RegionalHeatMap />
              <RecentAlerts />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
