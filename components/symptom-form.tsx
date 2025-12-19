"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Activity, Thermometer, Heart, Loader2 } from "lucide-react"

interface SymptomFormProps {
  onAnalyze: (data: SymptomData) => void
  isLoading: boolean
}

export interface SymptomData {
  symptoms: string
  age: string
  gender: string
  location: string
  useIoT: boolean
  pulse?: number
  temperature?: number
}

export function SymptomForm({ onAnalyze, isLoading }: SymptomFormProps) {
  const [symptoms, setSymptoms] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [location, setLocation] = useState("")
  const [useIoT, setUseIoT] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  // Simulated IoT data
  const [pulse] = useState(72)
  const [temperature] = useState(98.6)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze({
      symptoms,
      age,
      gender,
      location,
      useIoT,
      pulse: useIoT ? pulse : undefined,
      temperature: useIoT ? temperature : undefined,
    })
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Simulate voice input
    if (!isRecording) {
      setTimeout(() => {
        setSymptoms((prev) => prev + (prev ? " " : "") + "headache, fatigue, mild fever")
        setIsRecording(false)
      }, 2000)
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Symptom Input
        </CardTitle>
        <CardDescription>Describe your symptoms in detail for accurate AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptoms input */}
          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe your symptoms</Label>
            <div className="relative">
              <Textarea
                id="symptoms"
                placeholder="e.g., I have a persistent headache, feeling tired, slight fever for 2 days..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32 pr-12 resize-none"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`absolute right-2 top-2 ${isRecording ? "text-emergency" : "text-muted-foreground"}`}
                onClick={toggleRecording}
              >
                {isRecording ? <Mic className="h-5 w-5 animate-pulse" /> : <MicOff className="h-5 w-5" />}
                <span className="sr-only">{isRecording ? "Stop recording" : "Start voice input"}</span>
              </Button>
            </div>
            {isRecording && <p className="text-sm text-muted-foreground animate-pulse">Listening...</p>}
          </div>

          {/* Demographics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="age">Age Group</Label>
              <Select value={age} onValueChange={setAge} required>
                <SelectTrigger id="age">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-12">0-12 years</SelectItem>
                  <SelectItem value="13-17">13-17 years</SelectItem>
                  <SelectItem value="18-35">18-35 years</SelectItem>
                  <SelectItem value="36-50">36-50 years</SelectItem>
                  <SelectItem value="51-65">51-65 years</SelectItem>
                  <SelectItem value="65+">65+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender} required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Region</Label>
              <Select value={location} onValueChange={setLocation} required>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urban-north">Urban - North</SelectItem>
                  <SelectItem value="urban-south">Urban - South</SelectItem>
                  <SelectItem value="rural-north">Rural - North</SelectItem>
                  <SelectItem value="rural-south">Rural - South</SelectItem>
                  <SelectItem value="remote">Remote Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* IoT Toggle */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="iot-toggle" className="text-base font-medium">
                  Include IoT Sensor Data
                </Label>
                <p className="text-sm text-muted-foreground">Connect health sensors for more accurate analysis</p>
              </div>
              <Switch id="iot-toggle" checked={useIoT} onCheckedChange={setUseIoT} />
            </div>

            {useIoT && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-md bg-background p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emergency/10">
                    <Heart className="h-5 w-5 text-emergency" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pulse</p>
                    <p className="text-lg font-semibold">{pulse} BPM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-md bg-background p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                    <Thermometer className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-lg font-semibold">{temperature}°F</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading || !symptoms || !age || !gender || !location}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="mr-2 h-5 w-5" />
                Analyze Risk
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
