import { Brain, MapPin, Bell, History, Globe, WifiOff, Stethoscope, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Brain,
    title: "AI Symptom Analysis",
    description:
      "Advanced machine learning models analyze your symptoms and provide accurate risk assessments with explainable AI.",
  },
  {
    icon: Globe,
    title: "WHO Data Integration",
    description:
      "Regional health context from WHO indicators adjusts risk scores based on local healthcare accessibility.",
  },
  {
    icon: Bell,
    title: "Emergency Alerts",
    description:
      "Automatic notifications to family members and nearby hospitals when high-risk situations are detected.",
  },
  {
    icon: MapPin,
    title: "Hospital Locator",
    description:
      "Interactive map showing nearby hospitals and emergency centers with distance and travel time estimates.",
  },
  {
    icon: WifiOff,
    title: "Offline Support",
    description: "Full functionality in low-connectivity environments with on-device AI models and local data storage.",
  },
  {
    icon: History,
    title: "Health History",
    description: "Track your symptom analyses over time with detailed reports and risk level trends.",
  },
  {
    icon: Stethoscope,
    title: "IoT Integration",
    description: "Connect health sensors for real-time pulse, temperature, and other vital sign monitoring.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive dashboard for healthcare providers with risk distribution and regional insights.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Comprehensive Health Intelligence
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            VitalEdge combines AI-powered analysis with real-world health data to provide accurate, actionable health
            insights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-muted/30 transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
