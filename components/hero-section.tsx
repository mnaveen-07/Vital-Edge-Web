"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, ArrowRight, Brain, Heart, Shield, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            AI-Powered Healthcare Intelligence
          </Badge>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            AI-Powered Health Risk & <span className="text-primary">Emergency Intelligence</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            VitalEdge analyzes your symptoms, health data, and contextual information to prioritize medical risk and
            trigger emergency actions when needed.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/analyze">
              <Button size="lg" className="h-12 px-8 text-base">
                <Brain className="mr-2 h-5 w-5" />
                Analyze Symptoms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/emergency">
              <Button
                size="lg"
                variant="destructive"
                className="h-12 px-8 text-base bg-emergency hover:bg-emergency/90"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Emergency Help
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-success/20 blur-3xl" />
            <div className="relative rounded-2xl border bg-card p-6 shadow-2xl md:p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Brain className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Advanced symptom classification</p>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                    <Heart className="h-7 w-7 text-success" />
                  </div>
                  <h3 className="font-semibold">Risk Scoring</h3>
                  <p className="mt-1 text-sm text-muted-foreground">WHO data-enhanced assessment</p>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-muted/50 p-6 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emergency/10">
                    <Shield className="h-7 w-7 text-emergency" />
                  </div>
                  <h3 className="font-semibold">Emergency Action</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Instant alert system</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-muted p-4">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Supports offline mode for low-connectivity environments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
