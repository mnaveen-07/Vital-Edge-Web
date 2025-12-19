"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ta" | "hi"

interface Translations {
  [key: string]: {
    en: string
    ta: string
    hi: string
  }
}

export const translations: Translations = {
  // Navbar
  home: { en: "Home", ta: "முகப்பு", hi: "होम" },
  analyze: { en: "Analyze", ta: "பகுப்பாய்வு", hi: "विश्लेषण" },
  emergency: { en: "Emergency", ta: "அவசரம்", hi: "आपातकाल" },
  hospitals: { en: "Hospitals", ta: "மருத்துவமனைகள்", hi: "अस्पताल" },
  dashboard: { en: "Dashboard", ta: "டாஷ்போர்டு", hi: "डैशबोर्ड" },
  history: { en: "History", ta: "வரலாறு", hi: "इतिहास" },
  settings: { en: "Settings", ta: "அமைப்புகள்", hi: "सेटिंग्स" },
  login: { en: "Login", ta: "உள்நுழைய", hi: "लॉगिन" },
  signup: { en: "Sign Up", ta: "பதிவு செய்க", hi: "साइन अप" },
  online: { en: "Online", ta: "ஆன்லைன்", hi: "ऑनलाइन" },
  offline: { en: "Offline", ta: "ஆஃப்லைன்", hi: "ऑफलाइन" },

  // Hero Section
  heroTitle: {
    en: "AI-Powered Health Risk Assessment",
    ta: "AI-இயக்கும் சுகாதார இடர் மதிப்பீடு",
    hi: "AI-संचालित स्वास्थ्य जोखिम मूल्यांकन",
  },
  heroSubtitle: {
    en: "Get instant, intelligent health analysis powered by advanced AI. Understand your symptoms, assess risks, and connect with nearby healthcare facilities.",
    ta: "மேம்பட்ட AI மூலம் இயக்கப்படும் உடனடி, புத்திசாலித்தனமான சுகாதார பகுப்பாய்வைப் பெறுங்கள்.",
    hi: "उन्नत AI द्वारा संचालित तत्काल, बुद्धिमान स्वास्थ्य विश्लेषण प्राप्त करें।",
  },
  startAnalysis: { en: "Start Analysis", ta: "பகுப்பாய்வு தொடங்கு", hi: "विश्लेषण शुरू करें" },
  findHospitals: { en: "Find Hospitals", ta: "மருத்துவமனைகள் கண்டறிக", hi: "अस्पताल खोजें" },

  // Symptom Analysis
  symptomInput: { en: "Symptom Input", ta: "அறிகுறி உள்ளீடு", hi: "लक्षण इनपुट" },
  describeSymptoms: { en: "Describe your symptoms", ta: "உங்கள் அறிகுறிகளை விவரிக்கவும்", hi: "अपने लक्षणों का वर्णन करें" },
  symptomPlaceholder: {
    en: "e.g., I have a persistent headache, feeling tired, slight fever for 2 days...",
    ta: "எ.கா., எனக்கு தொடர்ந்து தலைவலி, சோர்வு, 2 நாட்களாக லேசான காய்ச்சல்...",
    hi: "उदा., मुझे लगातार सिरदर्द, थकान, 2 दिनों से हल्का बुखार...",
  },
  listening: { en: "Listening...", ta: "கேட்கிறது...", hi: "सुन रहा है..." },
  speakNow: {
    en: "Speak now in English, Tamil, or Hindi",
    ta: "இப்போது ஆங்கிலம், தமிழ் அல்லது இந்தியில் பேசுங்கள்",
    hi: "अब अंग्रेजी, तमिल या हिंदी में बोलें",
  },
  ageGroup: { en: "Age Group", ta: "வயது குழு", hi: "आयु समूह" },
  gender: { en: "Gender", ta: "பாலினம்", hi: "लिंग" },
  region: { en: "Region", ta: "பகுதி", hi: "क्षेत्र" },
  analyzeRisk: { en: "Analyze Risk", ta: "இடர் பகுப்பாய்வு", hi: "जोखिम विश्लेषण" },
  analyzing: { en: "Analyzing...", ta: "பகுப்பாய்வு செய்கிறது...", hi: "विश्लेषण हो रहा है..." },

  // IoT
  includeIoT: { en: "Include IoT Sensor Data", ta: "IoT சென்சார் தரவை சேர்க்கவும்", hi: "IoT सेंसर डेटा शामिल करें" },
  connectSensors: {
    en: "Connect health sensors for more accurate analysis",
    ta: "மிகவும் துல்லியமான பகுப்பாய்வுக்கு சுகாதார சென்சார்களை இணைக்கவும்",
    hi: "अधिक सटीक विश्लेषण के लिए स्वास्थ्य सेंसर कनेक्ट करें",
  },
  pulse: { en: "Pulse", ta: "துடிப்பு", hi: "नाड़ी" },
  temperature: { en: "Temperature", ta: "வெப்பநிலை", hi: "तापमान" },

  // Results
  aiAnalysis: { en: "AI Analysis Results", ta: "AI பகுப்பாய்வு முடிவுகள்", hi: "AI विश्लेषण परिणाम" },
  riskLevel: { en: "Risk Level", ta: "இடர் நிலை", hi: "जोखिम स्तर" },
  confidence: { en: "Confidence", ta: "நம்பகத்தன்மை", hi: "विश्वास" },
  low: { en: "Low", ta: "குறைந்த", hi: "कम" },
  medium: { en: "Medium", ta: "நடுத்தர", hi: "मध्यम" },
  high: { en: "High", ta: "அதிக", hi: "उच्च" },

  // Settings
  languageRegion: { en: "Language & Region", ta: "மொழி & பகுதி", hi: "भाषा और क्षेत्र" },
  displayLanguage: { en: "Display Language", ta: "காட்சி மொழி", hi: "प्रदर्शन भाषा" },
  emergencyContacts: { en: "Emergency Contacts", ta: "அவசர தொடர்புகள்", hi: "आपातकालीन संपर्क" },
  notifications: { en: "Notifications", ta: "அறிவிப்புகள்", hi: "सूचनाएं" },
  privacyData: { en: "Privacy & Data", ta: "தனியுரிமை & தரவு", hi: "गोपनीयता और डेटा" },
  saveSettings: { en: "Save Settings", ta: "அமைப்புகளை சேமி", hi: "सेटिंग्स सेव करें" },

  // New Features
  healthTips: { en: "Health Tips", ta: "சுகாதார குறிப்புகள்", hi: "स्वास्थ्य सुझाव" },
  aiAssistant: { en: "AI Health Assistant", ta: "AI சுகாதார உதவியாளர்", hi: "AI स्वास्थ्य सहायक" },
  firstAid: { en: "First Aid Guide", ta: "முதலுதவி வழிகாட்டி", hi: "प्राथमिक चिकित्सा गाइड" },
  medicationReminder: { en: "Medication Reminders", ta: "மருந்து நினைவூட்டல்கள்", hi: "दवा रिमाइंडर" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("vitaledge-language") as Language
    if (saved && ["en", "ta", "hi"].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("vitaledge-language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
