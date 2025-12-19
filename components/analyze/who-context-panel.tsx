import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, AlertCircle, TrendingUp, Hospital } from "lucide-react"

interface WHOContextPanelProps {
  location: string
}

export function WHOContextPanel({ location }: WHOContextPanelProps) {
  // Simulated WHO data based on location
  const getWHOData = (loc: string) => {
    const isRural = loc.includes("rural") || loc === "remote"
    const isRemote = loc === "remote"

    return {
      healthcareAccess: isRemote ? "Limited" : isRural ? "Moderate" : "Good",
      riskModifier: isRemote ? "+25%" : isRural ? "+15%" : "+0%",
      hospitalDensity: isRemote ? "Low" : isRural ? "Medium" : "High",
      emergencyResponse: isRemote ? "45+ min" : isRural ? "20-30 min" : "10-15 min",
      contextMessage: isRemote
        ? "Healthcare access in this region is limited, increasing urgency for medical situations."
        : isRural
          ? "Rural area with moderate healthcare facilities. Consider early consultation for concerning symptoms."
          : "Urban area with good healthcare access. Standard medical protocols apply.",
    }
  }

  const whoData = getWHOData(location)
  const isHighRisk = location === "remote" || location.includes("rural")

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            WHO Regional Context
          </CardTitle>
          <Badge
            variant={isHighRisk ? "destructive" : "secondary"}
            className={isHighRisk ? "bg-warning text-warning-foreground" : ""}
          >
            Risk Modifier: {whoData.riskModifier}
          </Badge>
        </div>
        <CardDescription>Health indicators for your region</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`rounded-lg p-4 ${isHighRisk ? "bg-warning/10 border border-warning/30" : "bg-muted/50"}`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`h-5 w-5 mt-0.5 ${isHighRisk ? "text-warning" : "text-muted-foreground"}`} />
            <p className="text-sm">{whoData.contextMessage}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Hospital className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Healthcare Access</span>
            </div>
            <p className="font-semibold">{whoData.healthcareAccess}</p>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Hospital Density</span>
            </div>
            <p className="font-semibold">{whoData.hospitalDensity}</p>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg Response Time</span>
            </div>
            <p className="font-semibold">{whoData.emergencyResponse}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
