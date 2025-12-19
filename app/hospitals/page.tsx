"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HospitalMap } from "@/components/hospitals/hospital-map"
import { Button } from "@/components/ui/button"
import { MapPin, Hospital, Siren, Building } from "lucide-react"

export default function HospitalsPage() {
  const [filter, setFilter] = useState<"all" | "emergency" | "general">("all")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Hospital Locator</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Find Nearby Hospitals</h1>
            <p className="mt-2 text-muted-foreground">
              Locate hospitals and emergency centers near you with real-time availability.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter !== "all" ? "bg-transparent" : ""}
            >
              <Hospital className="mr-1.5 h-4 w-4" />
              All Facilities
            </Button>
            <Button
              variant={filter === "emergency" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("emergency")}
              className={filter === "emergency" ? "bg-emergency hover:bg-emergency/90" : "bg-transparent"}
            >
              <Siren className="mr-1.5 h-4 w-4" />
              Emergency Only
            </Button>
            <Button
              variant={filter === "general" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("general")}
              className={filter !== "general" ? "bg-transparent" : ""}
            >
              <Building className="mr-1.5 h-4 w-4" />
              General Hospitals
            </Button>
          </div>

          <HospitalMap filter={filter} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
