"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle2, Info, Brain, Lightbulb, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface AnalysisResult {
  conditions: {
    name: string
    probability: number
  }[]
  riskLevel: "low" | "medium" | "high"
  confidence: number
  explanation: string[]
  contributingSymptoms: string[]
}

interface AIResultsPanelProps {
  result: AnalysisResult
}

export function AIResultsPanel({ result }: AIResultsPanelProps) {
  const getRiskConfig = (level: string) => {
    switch (level) {
      case "low":
        return {
          color: "bg-success text-success-foreground",
          bgColor: "bg-success/10",
          textColor: "text-success",
          icon: CheckCircle2,
          label: "Low Risk",
        }
      case "medium":
        return {
          color: "bg-warning text-warning-foreground",
          bgColor: "bg-warning/10",
          textColor: "text-warning",
          icon: Info,
          label: "Medium Risk",
        }
      case "high":
        return {
          color: "bg-emergency text-emergency-foreground",
          bgColor: "bg-emergency/10",
          textColor: "text-emergency",
          icon: AlertTriangle,
          label: "High Risk",
        }
      default:
        return {
          color: "bg-muted",
          bgColor: "bg-muted/10",
          textColor: "text-muted-foreground",
          icon: Info,
          label: "Unknown",
        }
    }
  }

  const riskConfig = getRiskConfig(result.riskLevel)
  const RiskIcon = riskConfig.icon

  return (
    <div className="space-y-6">
      {/* Risk Level Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div
          className={`h-2 ${result.riskLevel === "high" ? "bg-emergency" : result.riskLevel === "medium" ? "bg-warning" : "bg-success"}`}
        />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Analysis Results
            </CardTitle>
            <Badge className={riskConfig.color}>
              <RiskIcon className="mr-1 h-3.5 w-3.5" />
              {riskConfig.label}
            </Badge>
          </div>
          <CardDescription>Based on symptom analysis and health data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Confidence Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Analysis Confidence</span>
              <span className="font-semibold">{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
          </div>

          {/* Possible Conditions */}
          <div className="space-y-3">
            <h4 className="font-semibold">Possible Conditions</h4>
            <div className="space-y-2">
              {result.conditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <span className="font-medium">{condition.name}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={condition.probability} className="h-2 w-24" />
                    <span className="text-sm text-muted-foreground w-12 text-right">{condition.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Action for High Risk */}
          {result.riskLevel === "high" && (
            <div className="rounded-lg border border-emergency/50 bg-emergency/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-emergency mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-emergency">Immediate Attention Required</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your symptoms, we recommend seeking immediate medical attention.
                  </p>
                  <Link href="/emergency" className="inline-block mt-3">
                    <Button variant="destructive" size="sm" className="bg-emergency hover:bg-emergency/90">
                      Get Emergency Help
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Explainable AI Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Why This Risk Level?
          </CardTitle>
          <CardDescription>Understanding the AI&apos;s reasoning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {result.explanation.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-lg bg-muted/50 p-4">
            <h5 className="text-sm font-medium mb-2">Contributing Symptoms</h5>
            <div className="flex flex-wrap gap-2">
              {result.contributingSymptoms.map((symptom, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
