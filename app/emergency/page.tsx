import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EmergencyActionPanel } from "@/components/emergency/emergency-action-panel"
import { QuickCallPanel } from "@/components/emergency/quick-call-panel"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EmergencyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emergency/10 px-4 py-2 text-emergency mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Emergency Services</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Emergency Help</h1>
            <p className="mt-2 text-muted-foreground">
              Get immediate assistance in medical emergencies. Alert your contacts and nearby hospitals.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <EmergencyActionPanel />

            <div className="space-y-6">
              <QuickCallPanel />

              <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-semibold mb-2">Need to find a hospital?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View nearby hospitals and emergency centers on our interactive map.
                </p>
                <Link href="/hospitals">
                  <Button variant="outline" className="bg-transparent">
                    View Hospital Map
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
