import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/10 p-3">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Your Health, Protected by AI
            </h2>
            <p className="mb-8 text-pretty text-lg text-primary-foreground/80">
              Join thousands of users who trust VitalEdge for intelligent health monitoring and emergency response.
              Start your free health assessment today.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/analyze">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
                >
                  View Dashboard Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
