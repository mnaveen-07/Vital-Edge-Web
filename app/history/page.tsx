import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HistoryList } from "@/components/history/history-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
              <History className="h-4 w-4" />
              <span className="text-sm font-medium">Health History</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your Health History</h1>
            <p className="mt-2 text-muted-foreground">
              View your previous symptom analyses, risk assessments, and detailed reports.
            </p>
          </div>

          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">4</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-emergency" />
                  <span className="text-2xl font-bold">1</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold">4</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <HistoryList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
