"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"
import { Pill, Plus, Clock, Trash2, Check, Calendar } from "lucide-react"
import { toast } from "sonner"

interface Medication {
  id: number
  name: string
  dosage: string
  frequency: string
  times: string[]
  startDate: string
  endDate?: string
  notes?: string
  isActive: boolean
  takenToday: boolean[]
}

const initialMedications: Medication[] = [
  {
    id: 1,
    name: "Metformin",
    dosage: "500mg",
    frequency: "twice",
    times: ["08:00", "20:00"],
    startDate: "2024-01-01",
    notes: "Take with meals",
    isActive: true,
    takenToday: [true, false],
  },
  {
    id: 2,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "once",
    times: ["09:00"],
    startDate: "2024-02-15",
    notes: "For blood pressure",
    isActive: true,
    takenToday: [true],
  },
  {
    id: 3,
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "once",
    times: ["12:00"],
    startDate: "2024-03-01",
    isActive: true,
    takenToday: [false],
  },
]

export default function MedicationsPage() {
  const { language } = useLanguage()
  const [medications, setMedications] = useState<Medication[]>(initialMedications)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "once",
    time1: "08:00",
    time2: "20:00",
    time3: "14:00",
    notes: "",
  })

  const handleAddMedication = () => {
    if (!newMed.name || !newMed.dosage) {
      toast.error(
        language === "en"
          ? "Please fill in medication name and dosage"
          : language === "ta"
            ? "மருந்தின் பெயர் மற்றும் அளவை நிரப்பவும்"
            : "कृपया दवा का नाम और खुराक भरें",
      )
      return
    }

    const times =
      newMed.frequency === "once"
        ? [newMed.time1]
        : newMed.frequency === "twice"
          ? [newMed.time1, newMed.time2]
          : [newMed.time1, newMed.time2, newMed.time3]

    const medication: Medication = {
      id: Date.now(),
      name: newMed.name,
      dosage: newMed.dosage,
      frequency: newMed.frequency,
      times,
      startDate: new Date().toISOString().split("T")[0],
      notes: newMed.notes,
      isActive: true,
      takenToday: times.map(() => false),
    }

    setMedications([...medications, medication])
    setNewMed({ name: "", dosage: "", frequency: "once", time1: "08:00", time2: "20:00", time3: "14:00", notes: "" })
    setIsDialogOpen(false)
    toast.success(
      language === "en"
        ? "Medication added successfully"
        : language === "ta"
          ? "மருந்து வெற்றிகரமாக சேர்க்கப்பட்டது"
          : "दवा सफलतापूर्वक जोड़ी गई",
    )
  }

  const toggleTaken = (medId: number, timeIndex: number) => {
    setMedications(
      medications.map((med) => {
        if (med.id === medId) {
          const newTakenToday = [...med.takenToday]
          newTakenToday[timeIndex] = !newTakenToday[timeIndex]
          return { ...med, takenToday: newTakenToday }
        }
        return med
      }),
    )
  }

  const deleteMedication = (id: number) => {
    setMedications(medications.filter((m) => m.id !== id))
    toast.success(language === "en" ? "Medication removed" : language === "ta" ? "மருந்து நீக்கப்பட்டது" : "दवा हटा दी गई")
  }

  const toggleActive = (id: number) => {
    setMedications(medications.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m)))
  }

  const upcomingDoses = medications
    .filter((m) => m.isActive)
    .flatMap((m) =>
      m.times.map((time, index) => ({
        medication: m,
        time,
        taken: m.takenToday[index],
        index,
      })),
    )
    .sort((a, b) => a.time.localeCompare(b.time))

  const totalDoses = upcomingDoses.length
  const takenDoses = upcomingDoses.filter((d) => d.taken).length
  const adherenceRate = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
                <Pill className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === "en" && "Medication Tracker"}
                  {language === "ta" && "மருந்து கண்காணிப்பான்"}
                  {language === "hi" && "दवा ट्रैकर"}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {language === "en" && "Medication Reminders"}
                {language === "ta" && "மருந்து நினைவூட்டல்கள்"}
                {language === "hi" && "दवा रिमाइंडर"}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {language === "en" && "Track your medications and never miss a dose."}
                {language === "ta" && "உங்கள் மருந்துகளைக் கண்காணித்து ஒரு டோஸையும் தவறவிடாதீர்கள்."}
                {language === "hi" && "अपनी दवाओं को ट्रैक करें और कभी भी खुराक न छोड़ें।"}
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {language === "en" && "Add Medication"}
                  {language === "ta" && "மருந்து சேர்"}
                  {language === "hi" && "दवा जोड़ें"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {language === "en" && "Add New Medication"}
                    {language === "ta" && "புதிய மருந்து சேர்க்கவும்"}
                    {language === "hi" && "नई दवा जोड़ें"}
                  </DialogTitle>
                  <DialogDescription>
                    {language === "en" && "Enter your medication details to set up reminders."}
                    {language === "ta" && "நினைவூட்டல்களை அமைக்க உங்கள் மருந்து விவரங்களை உள்ளிடவும்."}
                    {language === "hi" && "रिमाइंडर सेट करने के लिए अपनी दवा का विवरण दर्ज करें।"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>
                      {language === "en" ? "Medication Name" : language === "ta" ? "மருந்தின் பெயர்" : "दवा का नाम"}
                    </Label>
                    <Input
                      placeholder={language === "en" ? "e.g., Metformin" : "எ.கா., மெட்ஃபார்மின்"}
                      value={newMed.name}
                      onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Dosage" : language === "ta" ? "அளவு" : "खुराक"}</Label>
                    <Input
                      placeholder={language === "en" ? "e.g., 500mg" : "எ.கா., 500mg"}
                      value={newMed.dosage}
                      onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Frequency" : language === "ta" ? "அலைவரிசை" : "आवृत्ति"}</Label>
                    <Select value={newMed.frequency} onValueChange={(v) => setNewMed({ ...newMed, frequency: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">
                          {language === "en"
                            ? "Once daily"
                            : language === "ta"
                              ? "ஒரு நாளைக்கு ஒரு முறை"
                              : "दिन में एक बार"}
                        </SelectItem>
                        <SelectItem value="twice">
                          {language === "en"
                            ? "Twice daily"
                            : language === "ta"
                              ? "ஒரு நாளைக்கு இரண்டு முறை"
                              : "दिन में दो बार"}
                        </SelectItem>
                        <SelectItem value="thrice">
                          {language === "en"
                            ? "Three times daily"
                            : language === "ta"
                              ? "ஒரு நாளைக்கு மூன்று முறை"
                              : "दिन में तीन बार"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>{language === "en" ? "Time 1" : language === "ta" ? "நேரம் 1" : "समय 1"}</Label>
                      <Input
                        type="time"
                        value={newMed.time1}
                        onChange={(e) => setNewMed({ ...newMed, time1: e.target.value })}
                      />
                    </div>
                    {(newMed.frequency === "twice" || newMed.frequency === "thrice") && (
                      <div className="space-y-2">
                        <Label>{language === "en" ? "Time 2" : language === "ta" ? "நேரம் 2" : "समय 2"}</Label>
                        <Input
                          type="time"
                          value={newMed.time2}
                          onChange={(e) => setNewMed({ ...newMed, time2: e.target.value })}
                        />
                      </div>
                    )}
                    {newMed.frequency === "thrice" && (
                      <div className="space-y-2">
                        <Label>{language === "en" ? "Time 3" : language === "ta" ? "நேரம் 3" : "समय 3"}</Label>
                        <Input
                          type="time"
                          value={newMed.time3}
                          onChange={(e) => setNewMed({ ...newMed, time3: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Notes (optional)" : language === "ta" ? "குறிப்புகள்" : "नोट्स"}</Label>
                    <Input
                      placeholder={language === "en" ? "e.g., Take with food" : "எ.கா., உணவுடன் எடுக்கவும்"}
                      value={newMed.notes}
                      onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddMedication} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  {language === "en" && "Add Medication"}
                  {language === "ta" && "மருந்து சேர்"}
                  {language === "hi" && "दवा जोड़ें"}
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en"
                      ? "Active Medications"
                      : language === "ta"
                        ? "செயலில் உள்ள மருந்துகள்"
                        : "सक्रिय दवाएं"}
                  </p>
                  <p className="text-2xl font-bold">{medications.filter((m) => m.isActive).length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <Check className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Taken Today" : language === "ta" ? "இன்று எடுத்தது" : "आज ली गई"}
                  </p>
                  <p className="text-2xl font-bold">
                    {takenDoses}/{totalDoses}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                  <Calendar className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Adherence Rate" : language === "ta" ? "இணக்க விகிதம்" : "पालन दर"}
                  </p>
                  <p className="text-2xl font-bold">{adherenceRate}%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card className="border-0 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {language === "en" && "Today's Schedule"}
                {language === "ta" && "இன்றைய அட்டவணை"}
                {language === "hi" && "आज का शेड्यूल"}
              </CardTitle>
              <CardDescription>
                {language === "en" && "Mark medications as taken when you've completed them."}
                {language === "ta" && "நீங்கள் முடித்ததும் மருந்துகளை எடுத்ததாகக் குறிக்கவும்."}
                {language === "hi" && "जब आप पूरा कर लें तो दवाओं को लिया हुआ चिह्नित करें।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingDoses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {language === "en" && "No medications scheduled. Add your first medication above."}
                  {language === "ta" && "மருந்துகள் திட்டமிடப்படவில்லை. மேலே உங்கள் முதல் மருந்தைச் சேர்க்கவும்."}
                  {language === "hi" && "कोई दवाई शेड्यूल नहीं है। ऊपर अपनी पहली दवा जोड़ें।"}
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingDoses.map((dose, i) => (
                    <div
                      key={`${dose.medication.id}-${dose.index}`}
                      className={`flex items-center justify-between p-4 rounded-lg border ${dose.taken ? "bg-success/5 border-success/20" : "bg-muted/30"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${dose.taken ? "bg-success/10" : "bg-primary/10"}`}
                        >
                          <Clock className={`h-5 w-5 ${dose.taken ? "text-success" : "text-primary"}`} />
                        </div>
                        <div>
                          <p className="font-medium">
                            {dose.medication.name} - {dose.medication.dosage}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dose.time} {dose.medication.notes && `• ${dose.medication.notes}`}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={dose.taken ? "secondary" : "default"}
                        size="sm"
                        onClick={() => toggleTaken(dose.medication.id, dose.index)}
                      >
                        {dose.taken ? (
                          <>
                            <Check className="mr-1.5 h-4 w-4" />
                            {language === "en" ? "Taken" : language === "ta" ? "எடுத்தது" : "ली गई"}
                          </>
                        ) : (
                          <>
                            {language === "en"
                              ? "Mark as Taken"
                              : language === "ta"
                                ? "எடுத்ததாக குறி"
                                : "लिया हुआ चिह्नित करें"}
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medication List */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                {language === "en" && "All Medications"}
                {language === "ta" && "அனைத்து மருந்துகள்"}
                {language === "hi" && "सभी दवाएं"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {medications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "en" && "No medications added yet."}
                    {language === "ta" && "இன்னும் மருந்துகள் சேர்க்கப்படவில்லை."}
                    {language === "hi" && "अभी तक कोई दवा नहीं जोड़ी गई।"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${med.isActive ? "bg-primary/10" : "bg-muted"}`}
                        >
                          <Pill className={`h-6 w-6 ${med.isActive ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{med.name}</p>
                            <Badge variant={med.isActive ? "default" : "secondary"}>
                              {med.isActive
                                ? language === "en"
                                  ? "Active"
                                  : language === "ta"
                                    ? "செயலில்"
                                    : "सक्रिय"
                                : language === "en"
                                  ? "Paused"
                                  : language === "ta"
                                    ? "இடைநிறுத்தப்பட்டது"
                                    : "रुका हुआ"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {med.dosage} •{" "}
                            {med.frequency === "once"
                              ? language === "en"
                                ? "Once daily"
                                : language === "ta"
                                  ? "தினமும் ஒருமுறை"
                                  : "दिन में एक बार"
                              : med.frequency === "twice"
                                ? language === "en"
                                  ? "Twice daily"
                                  : language === "ta"
                                    ? "தினமும் இருமுறை"
                                    : "दिन में दो बार"
                                : language === "en"
                                  ? "Three times daily"
                                  : language === "ta"
                                    ? "தினமும் மூன்று முறை"
                                    : "दिन में तीन बार"}{" "}
                            • {med.times.join(", ")}
                          </p>
                          {med.notes && <p className="text-xs text-muted-foreground mt-1">{med.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`active-${med.id}`} className="text-sm">
                            {language === "en" ? "Active" : language === "ta" ? "செயலில்" : "सक्रिय"}
                          </Label>
                          <Switch
                            id={`active-${med.id}`}
                            checked={med.isActive}
                            onCheckedChange={() => toggleActive(med.id)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-emergency"
                          onClick={() => deleteMedication(med.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
