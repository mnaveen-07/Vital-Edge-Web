"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Ambulance, Shield, HeartPulse } from "lucide-react"

const emergencyNumbers = [
  {
    icon: Ambulance,
    label: "Ambulance",
    number: "108",
    description: "Medical emergency services",
  },
  {
    icon: Shield,
    label: "Police",
    number: "100",
    description: "Law enforcement",
  },
  {
    icon: HeartPulse,
    label: "Health Helpline",
    number: "104",
    description: "24/7 health assistance",
  },
]

export function QuickCallPanel() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Quick Emergency Calls
        </CardTitle>
        <CardDescription>Tap to call emergency services directly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {emergencyNumbers.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full h-auto py-4 justify-start bg-transparent"
            onClick={() => handleCall(item.number)}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <span className="ml-auto text-2xl font-bold text-primary">{item.number}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
