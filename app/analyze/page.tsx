"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SymptomForm, type SymptomData } from "@/components/analyze/symptom-form"
import { AIResultsPanel, type AnalysisResult } from "@/components/analyze/ai-results-panel"
import { WHOContextPanel } from "@/components/analyze/who-context-panel"

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [submittedLocation, setSubmittedLocation] = useState("")

  const handleAnalyze = async (data: SymptomData) => {
    setIsLoading(true)
    setSubmittedLocation(data.location)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Generate mock result based on symptoms
    const symptoms = data.symptoms.toLowerCase()
    const isHighRisk =
      symptoms.includes("chest pain") || symptoms.includes("difficulty breathing") || symptoms.includes("severe")
    const isMediumRisk = symptoms.includes("fever") || symptoms.includes("headache") || symptoms.includes("fatigue")

    const mockResult: AnalysisResult = {
      conditions: [
        { name: isHighRisk ? "Cardiac Event" : isMediumRisk ? "Viral Infection" : "Common Cold", probability: 65 },
        { name: isHighRisk ? "Respiratory Distress" : isMediumRisk ? "Flu" : "Allergies", probability: 25 },
        { name: "Other", probability: 10 },
      ],
      riskLevel: isHighRisk ? "high" : isMediumRisk ? "medium" : "low",
      confidence: 87,
      explanation: [
        `Your reported symptoms (${data.symptoms.slice(0, 50)}...) suggest potential ${isHighRisk ? "serious" : "mild"} health concerns.`,
        `Age group (${data.age}) and gender (${data.gender}) have been factored into the analysis.`,
        data.useIoT
          ? `IoT data shows pulse at ${data.pulse} BPM and temperature at ${data.temperature}°F.`
          : "No IoT sensor data was included in the analysis.",
        `Regional health context for ${data.location.replace("-", " ")} has been applied to adjust risk scoring.`,
      ],
      contributingSymptoms: data.symptoms
        .split(",")
        .map((s) => s.trim())
        .slice(0, 5),
    }

    setResult(mockResult)
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Symptom Analysis</h1>
            <p className="mt-2 text-muted-foreground">
              Describe your symptoms and let our AI assess your health risk level.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <SymptomForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            <div className="space-y-6">
              {result ? (
                <>
                  <AIResultsPanel result={result} />
                  <WHOContextPanel location={submittedLocation} />
                </>
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-12 text-center">
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-muted-foreground">No analysis yet</p>
                    <p className="text-sm text-muted-foreground">
                      Fill in your symptoms and click &quot;Analyze Risk&quot; to get AI-powered health insights.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
