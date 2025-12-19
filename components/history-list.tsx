"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, ChevronRight, FileText, AlertTriangle, CheckCircle2, Info } from "lucide-react"

interface HistoryItem {
  id: number
  date: string
  symptoms: string
  condition: string
  riskLevel: "low" | "medium" | "high"
  confidence: number
  details: {
    explanation: string[]
    contributingSymptoms: string[]
    whoContext: string
  }
}

const historyData: HistoryItem[] = [
  {
    id: 1,
    date: "Dec 15, 2025",
    symptoms: "Headache, fatigue, mild fever",
    condition: "Viral Infection",
    riskLevel: "medium",
    confidence: 85,
    details: {
      explanation: [
        "Combination of headache and fatigue suggests possible viral infection",
        "Mild fever indicates body's immune response",
        "Duration of symptoms (2 days) within typical viral infection timeline",
      ],
      contributingSymptoms: ["Headache", "Fatigue", "Fever"],
      whoContext: "Urban area with good healthcare access",
    },
  },
  {
    id: 2,
    date: "Dec 10, 2025",
    symptoms: "Sore throat, cough, runny nose",
    condition: "Common Cold",
    riskLevel: "low",
    confidence: 92,
    details: {
      explanation: [
        "Classic symptoms of upper respiratory infection",
        "No signs of bacterial infection",
        "Symptoms consistent with seasonal cold patterns",
      ],
      contributingSymptoms: ["Sore throat", "Cough", "Runny nose"],
      whoContext: "Urban area with good healthcare access",
    },
  },
  {
    id: 3,
    date: "Nov 28, 2025",
    symptoms: "Chest tightness, shortness of breath, anxiety",
    condition: "Possible Cardiac Event",
    riskLevel: "high",
    confidence: 78,
    details: {
      explanation: [
        "Chest tightness combined with breathing difficulty requires immediate attention",
        "Symptoms could indicate cardiac event or severe anxiety",
        "Recommended immediate medical evaluation",
      ],
      contributingSymptoms: ["Chest tightness", "Shortness of breath", "Anxiety"],
      whoContext: "Emergency services notified",
    },
  },
  {
    id: 4,
    date: "Nov 15, 2025",
    symptoms: "Stomach pain, nausea, loss of appetite",
    condition: "Gastroenteritis",
    riskLevel: "low",
    confidence: 88,
    details: {
      explanation: [
        "Symptoms consistent with stomach infection",
        "No signs of severe dehydration",
        "Recommended rest and hydration",
      ],
      contributingSymptoms: ["Stomach pain", "Nausea", "Loss of appetite"],
      whoContext: "Urban area with good healthcare access",
    },
  },
]

export function HistoryList() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  const getRiskConfig = (level: string) => {
    switch (level) {
      case "low":
        return { color: "bg-success text-success-foreground", icon: CheckCircle2, label: "Low Risk" }
      case "medium":
        return { color: "bg-warning text-warning-foreground", icon: Info, label: "Medium Risk" }
      case "high":
        return { color: "bg-emergency text-emergency-foreground", icon: AlertTriangle, label: "High Risk" }
      default:
        return { color: "bg-muted", icon: Info, label: "Unknown" }
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Analysis History
        </CardTitle>
        <CardDescription>Your previous symptom analyses and results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyData.map((item) => {
            const riskConfig = getRiskConfig(item.riskLevel)
            const RiskIcon = riskConfig.icon
            return (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <button
                    className="w-full text-left rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {item.date}
                          </div>
                          <Badge className={riskConfig.color}>
                            <RiskIcon className="mr-1 h-3 w-3" />
                            {riskConfig.label}
                          </Badge>
                        </div>
                        <p className="font-semibold">{item.condition}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{item.symptoms}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Analysis Report
                    </DialogTitle>
                    <DialogDescription>{item.date}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Condition</p>
                        <p className="text-lg font-semibold">{item.condition}</p>
                      </div>
                      <Badge className={riskConfig.color}>
                        <RiskIcon className="mr-1 h-3 w-3" />
                        {riskConfig.label}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Reported Symptoms</p>
                      <p className="text-sm">{item.symptoms}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${item.confidence}%` }} />
                        </div>
                        <span className="text-sm font-semibold">{item.confidence}%</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">AI Explanation</p>
                      <ul className="space-y-2">
                        {item.details.explanation.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Contributing Symptoms</p>
                      <div className="flex flex-wrap gap-2">
                        {item.details.contributingSymptoms.map((symptom, index) => (
                          <Badge key={index} variant="secondary">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">{item.details.whoContext}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>

        {historyData.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No history yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your symptom analyses will appear here after your first analysis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
