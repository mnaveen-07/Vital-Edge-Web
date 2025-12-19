// lib/api.ts
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface BackendResponse {
  risk_level: "low" | "medium" | "high"
  confidence: number
  conditions: {
    name: string
    probability: number
  }[]
  explanation: string | string[]
  extracted_symptoms: string[]
}

export async function analyzeSymptoms(payload: {
  symptoms_text: string
  age_group: string
  gender: string
  region: string
  language: string
  include_iot?: boolean
  vitals?: {
    pulse?: number
    temperature?: number
  }
}) {
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to analyze symptoms")
  }

  return (await res.json()) as BackendResponse
}