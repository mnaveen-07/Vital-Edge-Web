"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock, Phone, ExternalLink, HospitalIcon } from "lucide-react"

interface Hospital {
  id: number
  name: string
  type: "emergency" | "general" | "clinic"
  distance: string
  time: string
  address: string
  phone: string
  available: boolean
  lat: number
  lng: number
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    type: "emergency",
    distance: "1.2 km",
    time: "5 min",
    address: "123 Medical Center Dr",
    phone: "+1 234-567-8900",
    available: true,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Metro Emergency Center",
    type: "emergency",
    distance: "2.5 km",
    time: "8 min",
    address: "456 Emergency Ave",
    phone: "+1 234-567-8901",
    available: true,
    lat: 40.7148,
    lng: -74.008,
  },
  {
    id: 3,
    name: "Community Health Clinic",
    type: "clinic",
    distance: "0.8 km",
    time: "3 min",
    address: "789 Health St",
    phone: "+1 234-567-8902",
    available: true,
    lat: 40.7108,
    lng: -74.004,
  },
  {
    id: 4,
    name: "Regional Medical Center",
    type: "general",
    distance: "4.2 km",
    time: "12 min",
    address: "321 Hospital Blvd",
    phone: "+1 234-567-8903",
    available: false,
    lat: 40.7168,
    lng: -74.01,
  },
  {
    id: 5,
    name: "University Hospital",
    type: "general",
    distance: "5.8 km",
    time: "18 min",
    address: "555 University Ave",
    phone: "+1 234-567-8904",
    available: true,
    lat: 40.7188,
    lng: -74.012,
  },
]

interface HospitalMapProps {
  filter: "all" | "emergency" | "general"
}

export function HospitalMap({ filter }: HospitalMapProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)

  const filteredHospitals = hospitals.filter((h) =>
    filter === "all" ? true : h.type === filter || h.type === "clinic",
  )

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "emergency":
        return { color: "bg-emergency text-emergency-foreground", label: "Emergency" }
      case "general":
        return { color: "bg-primary text-primary-foreground", label: "General" }
      case "clinic":
        return { color: "bg-success text-success-foreground", label: "Clinic" }
      default:
        return { color: "bg-muted", label: "Unknown" }
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Map View */}
      <Card className="lg:col-span-2 border-0 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-[500px] bg-muted">
            {/* Simulated map background */}
            <div className="absolute inset-0 bg-[url('/street-map.png')] bg-cover bg-center opacity-50" />

            {/* Map overlay with grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

            {/* Hospital markers */}
            {filteredHospitals.map((hospital, index) => (
              <button
                key={hospital.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                  selectedHospital?.id === hospital.id ? "scale-125 z-10" : "hover:scale-110"
                }`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 3) * 20}%`,
                }}
                onClick={() => setSelectedHospital(hospital)}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg ${
                    hospital.type === "emergency"
                      ? "bg-emergency text-emergency-foreground"
                      : hospital.type === "clinic"
                        ? "bg-success text-success-foreground"
                        : "bg-primary text-primary-foreground"
                  }`}
                >
                  <HospitalIcon className="h-5 w-5" />
                </div>
                {selectedHospital?.id === hospital.id && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-background px-3 py-2 text-sm font-medium shadow-lg">
                    {hospital.name}
                  </div>
                )}
              </button>
            ))}

            {/* Current location marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="h-4 w-4 rounded-full bg-primary animate-ping absolute" />
                <div className="h-4 w-4 rounded-full bg-primary border-2 border-background relative" />
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 rounded-lg bg-background/95 p-3 shadow-lg">
              <p className="text-xs font-medium mb-2">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emergency" />
                  <span className="text-xs">Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-xs">General</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-xs">Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary border-2 border-background" />
                  <span className="text-xs">You</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <p className="text-sm font-medium text-muted-foreground">{filteredHospitals.length} hospitals found nearby</p>

        {filteredHospitals.map((hospital) => {
          const typeConfig = getTypeConfig(hospital.type)
          return (
            <Card
              key={hospital.id}
              className={`cursor-pointer transition-all border-0 shadow-sm hover:shadow-md ${
                selectedHospital?.id === hospital.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedHospital(hospital)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold leading-tight">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{hospital.address}</p>
                  </div>
                  <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {hospital.distance}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {hospital.time}
                  </div>
                  <div
                    className={`flex items-center gap-1 ${hospital.available ? "text-success" : "text-muted-foreground"}`}
                  >
                    <div className={`h-2 w-2 rounded-full ${hospital.available ? "bg-success" : "bg-muted"}`} />
                    {hospital.available ? "Available" : "Busy"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <a href={`tel:${hospital.phone}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      Call
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Navigation className="mr-1.5 h-3.5 w-3.5" />
                    Directions
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
