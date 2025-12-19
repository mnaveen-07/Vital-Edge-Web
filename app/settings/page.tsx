"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Globe, Users, Shield, Bell, Trash2, Plus, Save, Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/lib/language-context"

interface EmergencyContact {
  id: number
  name: string
  phone: string
  relationship: string
}

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [dataConsent, setDataConsent] = useState(true)
  const [locationConsent, setLocationConsent] = useState(true)
  const [analyticsConsent, setAnalyticsConsent] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: 1, name: "John Doe", phone: "+1 234-567-8900", relationship: "Spouse" },
    { id: 2, name: "Jane Smith", phone: "+1 234-567-8901", relationship: "Parent" },
  ])

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      setContacts([...contacts, { id: Date.now(), ...newContact }])
      setNewContact({ name: "", phone: "", relationship: "" })
      toast.success(
        language === "en"
          ? "Emergency contact added"
          : language === "ta"
            ? "அவசர தொடர்பு சேர்க்கப்பட்டது"
            : "आपातकालीन संपर्क जोड़ा गया",
      )
    }
  }

  const handleRemoveContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id))
    toast.success(
      language === "en"
        ? "Emergency contact removed"
        : language === "ta"
          ? "அவசர தொடர்பு நீக்கப்பட்டது"
          : "आपातकालीन संपर्क हटाया गया",
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success(
      language === "en"
        ? "Settings saved successfully"
        : language === "ta"
          ? "அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன"
          : "सेटिंग्स सफलतापूर्वक सेव हो गईं",
    )
  }

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as "en" | "ta" | "hi")
    toast.success(
      newLang === "en"
        ? "Language changed to English"
        : newLang === "ta"
          ? "மொழி தமிழுக்கு மாற்றப்பட்டது"
          : "भाषा हिंदी में बदल दी गई",
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 max-w-3xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">{t("settings")}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("settings")}</h1>
            <p className="mt-2 text-muted-foreground">
              {language === "en" && "Manage your preferences, contacts, and privacy settings."}
              {language === "ta" && "உங்கள் விருப்பங்கள், தொடர்புகள் மற்றும் தனியுரிமை அமைப்புகளை நிர்வகிக்கவும்."}
              {language === "hi" && "अपनी प्राथमिकताएं, संपर्क और गोपनीयता सेटिंग्स प्रबंधित करें।"}
            </p>
          </div>

          <div className="space-y-8">
            {/* Language Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  {t("languageRegion")}
                </CardTitle>
                <CardDescription>
                  {language === "en" && "Choose your preferred language for the entire application"}
                  {language === "ta" && "முழு பயன்பாட்டிற்கும் உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்"}
                  {language === "hi" && "संपूर्ण एप्लिकेशन के लिए अपनी पसंदीदा भाषा चुनें"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="language">{t("displayLanguage")}</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-56">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">
                          <div className="flex items-center gap-2">
                            <span>🇬🇧</span>
                            <span>English</span>
                            {language === "en" && <Check className="h-4 w-4 ml-auto text-primary" />}
                          </div>
                        </SelectItem>
                        <SelectItem value="ta">
                          <div className="flex items-center gap-2">
                            <span>🇮🇳</span>
                            <span>தமிழ் (Tamil)</span>
                            {language === "ta" && <Check className="h-4 w-4 ml-auto text-primary" />}
                          </div>
                        </SelectItem>
                        <SelectItem value="hi">
                          <div className="flex items-center gap-2">
                            <span>🇮🇳</span>
                            <span>हिंदी (Hindi)</span>
                            {language === "hi" && <Check className="h-4 w-4 ml-auto text-primary" />}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language Preview */}
                  <div className="rounded-lg bg-muted/50 p-4 text-sm">
                    <p className="font-medium mb-2">
                      {language === "en" && "Preview:"}
                      {language === "ta" && "முன்னோட்டம்:"}
                      {language === "hi" && "पूर्वावलोकन:"}
                    </p>
                    <p className="text-muted-foreground">
                      {language === "en" &&
                        "The entire application will be displayed in English. Voice input will transcribe in any language and auto-translate to English."}
                      {language === "ta" &&
                        "முழு பயன்பாடும் தமிழில் காட்டப்படும். குரல் உள்ளீடு எந்த மொழியிலும் படியெடுக்கும் மற்றும் தானாகவே ஆங்கிலத்தில் மொழிபெயர்க்கும்."}
                      {language === "hi" &&
                        "संपूर्ण एप्लिकेशन हिंदी में प्रदर्शित होगा। वॉयस इनपुट किसी भी भाषा में ट्रांसक्राइब करेगा और स्वचालित रूप से अंग्रेजी में अनुवाद करेगा।"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {t("emergencyContacts")}
                </CardTitle>
                <CardDescription>
                  {language === "en" && "People to notify in case of emergency"}
                  {language === "ta" && "அவசர நிலையில் தெரிவிக்க வேண்டியவர்கள்"}
                  {language === "hi" && "आपात स्थिति में सूचित करने वाले लोग"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Existing contacts */}
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.phone} • {contact.relationship}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-emergency"
                      onClick={() => handleRemoveContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Add new contact */}
                <div className="rounded-lg border border-dashed p-4 space-y-4">
                  <p className="text-sm font-medium">
                    {language === "en" && "Add New Contact"}
                    {language === "ta" && "புதிய தொடர்பைச் சேர்க்கவும்"}
                    {language === "hi" && "नया संपर्क जोड़ें"}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Input
                      placeholder={language === "en" ? "Name" : language === "ta" ? "பெயர்" : "नाम"}
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                    <Input
                      placeholder={language === "en" ? "Phone" : language === "ta" ? "தொலைபேசி" : "फ़ोन"}
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                    <Select
                      value={newContact.relationship}
                      onValueChange={(v) => setNewContact({ ...newContact, relationship: v })}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={language === "en" ? "Relationship" : language === "ta" ? "உறவு" : "रिश्ता"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spouse">
                          {language === "en" ? "Spouse" : language === "ta" ? "கணவன்/மனைவி" : "पति/पत्नी"}
                        </SelectItem>
                        <SelectItem value="Parent">
                          {language === "en" ? "Parent" : language === "ta" ? "பெற்றோர்" : "माता-पिता"}
                        </SelectItem>
                        <SelectItem value="Sibling">
                          {language === "en" ? "Sibling" : language === "ta" ? "உடன்பிறப்பு" : "भाई-बहन"}
                        </SelectItem>
                        <SelectItem value="Child">
                          {language === "en" ? "Child" : language === "ta" ? "குழந்தை" : "बच्चा"}
                        </SelectItem>
                        <SelectItem value="Friend">
                          {language === "en" ? "Friend" : language === "ta" ? "நண்பர்" : "दोस्त"}
                        </SelectItem>
                        <SelectItem value="Other">
                          {language === "en" ? "Other" : language === "ta" ? "மற்றவை" : "अन्य"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAddContact} className="bg-transparent">
                    <Plus className="mr-1.5 h-4 w-4" />
                    {language === "en" && "Add Contact"}
                    {language === "ta" && "தொடர்பைச் சேர்"}
                    {language === "hi" && "संपर्क जोड़ें"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  {t("notifications")}
                </CardTitle>
                <CardDescription>
                  {language === "en" && "Configure how you receive alerts"}
                  {language === "ta" && "நீங்கள் எச்சரிக்கைகளை எவ்வாறு பெறுகிறீர்கள் என்பதை கட்டமைக்கவும்"}
                  {language === "hi" && "आप अलर्ट कैसे प्राप्त करते हैं इसे कॉन्फ़िगर करें"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === "en" && "Push Notifications"}
                      {language === "ta" && "புஷ் அறிவிப்புகள்"}
                      {language === "hi" && "पुश नोटिफिकेशन"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" && "Receive alerts on your device"}
                      {language === "ta" && "உங்கள் சாதனத்தில் எச்சரிக்கைகளைப் பெறுங்கள்"}
                      {language === "hi" && "अपने डिवाइस पर अलर्ट प्राप्त करें"}
                    </p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === "en" && "SMS Alerts"}
                      {language === "ta" && "SMS எச்சரிக்கைகள்"}
                      {language === "hi" && "SMS अलर्ट"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" && "Receive emergency alerts via SMS"}
                      {language === "ta" && "SMS மூலம் அவசர எச்சரிக்கைகளைப் பெறுங்கள்"}
                      {language === "hi" && "SMS के माध्यम से आपातकालीन अलर्ट प्राप्त करें"}
                    </p>
                  </div>
                  <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === "en" && "Email Notifications"}
                      {language === "ta" && "மின்னஞ்சல் அறிவிப்புகள்"}
                      {language === "hi" && "ईमेल नोटिफिकेशन"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" && "Receive reports and updates via email"}
                      {language === "ta" && "மின்னஞ்சல் மூலம் அறிக்கைகள் மற்றும் புதுப்பிப்புகளைப் பெறுங்கள்"}
                      {language === "hi" && "ईमेल के माध्यम से रिपोर्ट और अपडेट प्राप्त करें"}
                    </p>
                  </div>
                  <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("privacyData")}
                </CardTitle>
                <CardDescription>
                  {language === "en" && "Manage your data and privacy preferences"}
                  {language === "ta" && "உங்கள் தரவு மற்றும் தனியுரிமை விருப்பங்களை நிர்வகிக்கவும்"}
                  {language === "hi" && "अपने डेटा और गोपनीयता प्राथमिकताएं प्रबंधित करें"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === "en" && "Health Data Collection"}
                      {language === "ta" && "சுகாதார தரவு சேகரிப்பு"}
                      {language === "hi" && "स्वास्थ्य डेटा संग्रह"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" && "Allow AI analysis of your health data"}
                      {language === "ta" && "உங்கள் சுகாதார தரவின் AI பகுப்பாய்வை அனுமதிக்கவும்"}
                      {language === "hi" && "अपने स्वास्थ्य डेटा के AI विश्लेषण की अनुमति दें"}
                    </p>
                  </div>
                  <Switch checked={dataConsent} onCheckedChange={setDataConsent} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === "en" && "Location Services"}
                      {language === "ta" && "இருப்பிட சேவைகள்"}
                      {language === "hi" && "लोकेशन सेवाएं"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" && "Use location for emergency response"}
                      {language === "ta" && "அவசர பதிலுக்கு இருப்பிடத்தைப் பயன்படுத்தவும்"}
                      {language === "hi" && "आपातकालीन प्रतिक्रिया के लिए लोकेशन का उपयोग करें"}
                    </p>
                  </div>
                  <Switch checked={locationConsent} onCheckedChange={setLocationConsent} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === "en" && "Analytics & Improvement"}
                      {language === "ta" && "பகுப்பாய்வு & மேம்பாடு"}
                      {language === "hi" && "विश्लेषण और सुधार"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" && "Help improve VitalEdge with anonymous data"}
                      {language === "ta" && "அநாமதேய தரவுடன் VitalEdge-ஐ மேம்படுத்த உதவுங்கள்"}
                      {language === "hi" && "अनाम डेटा के साथ VitalEdge को बेहतर बनाने में मदद करें"}
                    </p>
                  </div>
                  <Switch checked={analyticsConsent} onCheckedChange={setAnalyticsConsent} />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button size="lg" className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {language === "en" && "Saving..."}
                  {language === "ta" && "சேமிக்கிறது..."}
                  {language === "hi" && "सेव हो रहा है..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {t("saveSettings")}
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
