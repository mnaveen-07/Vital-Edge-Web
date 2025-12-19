"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, MicOff, Activity, Thermometer, Heart, Loader2, Languages, Volume2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { toast } from "sonner"
import type { SpeechRecognition } from "web-speech-api" // Import SpeechRecognition

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

// Language codes for Web Speech API
const speechLanguages = {
  en: "en-US",
  ta: "ta-IN",
  hi: "hi-IN",
}

export function SymptomForm({ onAnalyze, isLoading }: SymptomFormProps) {
  const { t, language } = useLanguage()
  const [symptoms, setSymptoms] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [location, setLocation] = useState("")
  const [useIoT, setUseIoT] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [speechLanguage, setSpeechLanguage] = useState<"en" | "ta" | "hi">("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState("")

  // Refs for speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Simulated IoT data
  const [pulse] = useState(72)
  const [temperature] = useState(98.6)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

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

  // Translate text to English using a simple translation approach
  const translateToEnglish = async (text: string, fromLang: string): Promise<string> => {
    if (fromLang === "en") return text

    setIsTranslating(true)
    try {
      // Using MyMemory Translation API (free, no API key needed)
      const langPair = fromLang === "ta" ? "ta|en" : "hi|en"
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`,
      )
      const data = await response.json()
      setIsTranslating(false)

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText
      }
      return text
    } catch (error) {
      console.error("Translation error:", error)
      setIsTranslating(false)
      return text
    }
  }

  const startRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported in this browser. Try Chrome or Edge.")
      return
    }

    const recognition = recognitionRef.current
    recognition.lang = speechLanguages[speechLanguage]

    recognition.onstart = () => {
      setIsRecording(true)
      setInterimTranscript("")
      toast.success(
        `Listening in ${speechLanguage === "en" ? "English" : speechLanguage === "ta" ? "Tamil" : "Hindi"}...`,
      )
    }

    recognition.onresult = async (event) => {
      let interim = ""
      let final = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += transcript
        } else {
          interim = transcript
        }
      }

      setInterimTranscript(interim)

      if (final) {
        // Translate to English if not already in English
        const translated = await translateToEnglish(final, speechLanguage)
        setSymptoms((prev) => {
          const newText = prev ? `${prev} ${translated}` : translated
          return newText.trim()
        })
        setInterimTranscript("")
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsRecording(false)
      if (event.error === "no-speech") {
        toast.error("No speech detected. Please try again.")
      } else if (event.error === "not-allowed") {
        toast.error("Microphone access denied. Please allow microphone access.")
      } else {
        toast.error(`Error: ${event.error}`)
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
      setInterimTranscript("")
    }

    try {
      recognition.start()
    } catch (error) {
      console.error("Failed to start recognition:", error)
      toast.error("Failed to start voice input")
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setInterimTranscript("")
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {t("symptomInput")}
        </CardTitle>
        <CardDescription>
          {language === "en" && "Describe your symptoms in detail for accurate AI analysis"}
          {language === "ta" && "துல்லியமான AI பகுப்பாய்வுக்கு உங்கள் அறிகுறிகளை விரிவாக விவரிக்கவும்"}
          {language === "hi" && "सटीक AI विश्लेषण के लिए अपने लक्षणों का विस्तार से वर्णन करें"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Voice Language Selector */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Languages className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Voice Input Language:</span>
            <div className="flex gap-2">
              {(["en", "ta", "hi"] as const).map((lang) => (
                <Button
                  key={lang}
                  type="button"
                  size="sm"
                  variant={speechLanguage === lang ? "default" : "outline"}
                  onClick={() => setSpeechLanguage(lang)}
                  className="text-xs"
                >
                  {lang === "en" ? "English" : lang === "ta" ? "தமிழ்" : "हिंदी"}
                </Button>
              ))}
            </div>
          </div>

          {/* Symptoms input */}
          <div className="space-y-2">
            <Label htmlFor="symptoms">{t("describeSymptoms")}</Label>
            <div className="relative">
              <Textarea
                id="symptoms"
                placeholder={t("symptomPlaceholder")}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32 pr-16 resize-none"
                required
              />
              <div className="absolute right-2 top-2 flex flex-col gap-1">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "secondary"}
                  size="icon"
                  className={`${isRecording ? "animate-pulse" : ""}`}
                  onClick={toggleRecording}
                  disabled={isTranslating}
                >
                  {isRecording ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  <span className="sr-only">{isRecording ? "Stop recording" : "Start voice input"}</span>
                </Button>
              </div>
            </div>

            {/* Recording Status */}
            {isRecording && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emergency/10 border border-emergency/20">
                <Volume2 className="h-4 w-4 text-emergency animate-pulse" />
                <span className="text-sm text-emergency font-medium">{t("listening")}</span>
                <span className="text-sm text-muted-foreground">({t("speakNow")})</span>
              </div>
            )}

            {/* Interim Transcript */}
            {interimTranscript && (
              <div className="p-2 rounded bg-muted/50 text-sm text-muted-foreground italic">{interimTranscript}...</div>
            )}

            {/* Translating Status */}
            {isTranslating && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Translating to English...</span>
              </div>
            )}
          </div>

          {/* Demographics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="age">{t("ageGroup")}</Label>
              <Select value={age} onValueChange={setAge} required>
                <SelectTrigger id="age">
                  <SelectValue
                    placeholder={language === "en" ? "Select age" : language === "ta" ? "வயதை தேர்ந்தெடுக்கவும்" : "आयु चुनें"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-12">
                    0-12 {language === "en" ? "years" : language === "ta" ? "ஆண்டுகள்" : "वर्ष"}
                  </SelectItem>
                  <SelectItem value="13-17">
                    13-17 {language === "en" ? "years" : language === "ta" ? "ஆண்டுகள்" : "वर्ष"}
                  </SelectItem>
                  <SelectItem value="18-35">
                    18-35 {language === "en" ? "years" : language === "ta" ? "ஆண்டுகள்" : "वर्ष"}
                  </SelectItem>
                  <SelectItem value="36-50">
                    36-50 {language === "en" ? "years" : language === "ta" ? "ஆண்டுகள்" : "वर्ष"}
                  </SelectItem>
                  <SelectItem value="51-65">
                    51-65 {language === "en" ? "years" : language === "ta" ? "ஆண்டுகள்" : "वर்ष"}
                  </SelectItem>
                  <SelectItem value="65+">
                    65+ {language === "en" ? "years" : language === "ta" ? "ஆண்டுகள்" : "वर्ष"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">{t("gender")}</Label>
              <Select value={gender} onValueChange={setGender} required>
                <SelectTrigger id="gender">
                  <SelectValue
                    placeholder={
                      language === "en" ? "Select gender" : language === "ta" ? "பாலினத்தை தேர்ந்தெடு" : "लिंग चुनें"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{language === "en" ? "Male" : language === "ta" ? "ஆண்" : "पुरुष"}</SelectItem>
                  <SelectItem value="female">
                    {language === "en" ? "Female" : language === "ta" ? "பெண்" : "महिला"}
                  </SelectItem>
                  <SelectItem value="other">
                    {language === "en" ? "Other" : language === "ta" ? "மற்றவை" : "अन्य"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t("region")}</Label>
              <Select value={location} onValueChange={setLocation} required>
                <SelectTrigger id="location">
                  <SelectValue
                    placeholder={
                      language === "en" ? "Select region" : language === "ta" ? "பகுதியை தேர்ந்தெடு" : "क्षेत्र चुनें"
                    }
                  />
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
                  {t("includeIoT")}
                </Label>
                <p className="text-sm text-muted-foreground">{t("connectSensors")}</p>
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
                    <p className="text-sm text-muted-foreground">{t("pulse")}</p>
                    <p className="text-lg font-semibold">{pulse} BPM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-md bg-background p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10">
                    <Thermometer className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("temperature")}</p>
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
                {t("analyzing")}
              </>
            ) : (
              <>
                <Activity className="mr-2 h-5 w-5" />
                {t("analyzeRisk")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
