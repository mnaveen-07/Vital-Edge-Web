"use client"
import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/language-context"
import { MessageSquare, Send, Bot, User, Sparkles, Loader2, AlertCircle } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickQuestions = {
  en: [
    "What are symptoms of diabetes?",
    "How to reduce high blood pressure?",
    "What is a healthy BMI range?",
    "How much water should I drink daily?",
    "What are signs of dehydration?",
    "How to improve sleep quality?",
  ],
  ta: [
    "நீரிழிவு நோயின் அறிகுறிகள் என்ன?",
    "உயர் இரத்த அழுத்தத்தை எவ்வாறு குறைப்பது?",
    "ஆரோக்கியமான BMI வரம்பு என்ன?",
    "நான் தினமும் எவ்வளவு தண்ணீர் குடிக்க வேண்டும்?",
    "நீரிழப்பின் அறிகுறிகள் என்ன?",
    "தூக்க தரத்தை எவ்வாறு மேம்படுத்துவது?",
  ],
  hi: [
    "मधुमेह के लक्षण क्या हैं?",
    "उच्च रक्तचाप कैसे कम करें?",
    "स्वस्थ BMI रेंज क्या है?",
    "मुझे रोजाना कितना पानी पीना चाहिए?",
    "निर्जलीकरण के संकेत क्या हैं?",
    "नींद की गुणवत्ता कैसे सुधारें?",
  ],
}

// Simulated AI responses
const getAIResponse = (question: string, language: string): string => {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes("diabetes") || lowerQuestion.includes("நீரிழிவு") || lowerQuestion.includes("मधुमेह")) {
    return language === "en"
      ? "Common symptoms of diabetes include:\n\n• Frequent urination\n• Increased thirst and hunger\n• Unexplained weight loss\n• Fatigue and weakness\n• Blurred vision\n• Slow healing of cuts and wounds\n• Numbness or tingling in hands/feet\n\n⚠️ If you experience these symptoms, please consult a healthcare provider for proper diagnosis and treatment."
      : language === "ta"
        ? "நீரிழிவு நோயின் பொதுவான அறிகுறிகள்:\n\n• அடிக்கடி சிறுநீர் கழித்தல்\n• அதிகரித்த தாகம் மற்றும் பசி\n• விவரிக்க முடியாத எடை இழப்பு\n• சோர்வு மற்றும் பலவீனம்\n• மங்கலான பார்வை\n• வெட்டுக்கள் மற்றும் காயங்கள் மெதுவாக குணமடைதல்\n\n⚠️ இந்த அறிகுறிகளை நீங்கள் அனுபவித்தால், சரியான நோயறிதல் மற்றும் சிகிச்சைக்கு மருத்துவரை அணுகவும்."
        : "मधुमेह के सामान्य लक्षण:\n\n• बार-बार पेशाब आना\n• बढ़ी हुई प्यास और भूख\n• अस्पष्टीकृत वजन घटना\n• थकान और कमजोरी\n• धुंधली दृष्टि\n• कट और घावों का धीमा उपचार\n\n⚠️ यदि आप इन लक्षणों का अनुभव करते हैं, तो कृपया उचित निदान और उपचार के लिए डॉक्टर से परामर्श करें।"
  }

  if (
    lowerQuestion.includes("blood pressure") ||
    lowerQuestion.includes("இரத்த அழுத்த") ||
    lowerQuestion.includes("रक्तचाप")
  ) {
    return language === "en"
      ? "To help reduce high blood pressure naturally:\n\n• Reduce sodium intake (less than 2,300mg/day)\n• Exercise regularly (30 min/day, 5 days/week)\n• Maintain a healthy weight\n• Limit alcohol consumption\n• Quit smoking\n• Eat a DASH diet (fruits, vegetables, whole grains)\n• Manage stress through meditation or yoga\n• Get adequate sleep (7-8 hours)\n\n💊 Always take prescribed medications as directed by your doctor."
      : language === "ta"
        ? "உயர் இரத்த அழுத்தத்தை இயற்கையாகக் குறைக்க:\n\n• சோடியம் உட்கொள்ளலைக் குறைக்கவும் (ஒரு நாளைக்கு 2,300mg க்கும் குறைவாக)\n• தொடர்ந்து உடற்பயிற்சி செய்யுங்கள் (நாளொன்றுக்கு 30 நிமிடம்)\n• ஆரோக்கியமான எடையை பராமரிக்கவும்\n• மது அருந்துவதை குறைக்கவும்\n• புகைபிடிப்பதை நிறுத்துங்கள்\n• DASH உணவை சாப்பிடுங்கள்\n• தியானம் அல்லது யோகா மூலம் மன அழுத்தத்தை நிர்வகிக்கவும்\n\n💊 உங்கள் மருத்துவர் பரிந்துரைத்தபடி எப்போதும் மருந்துகளை எடுத்துக்கொள்ளுங்கள்."
        : "उच्च रक्तचाप को स्वाभाविक रूप से कम करने के लिए:\n\n• सोडियम का सेवन कम करें (2,300mg/दिन से कम)\n• नियमित व्यायाम करें (30 मिनट/दिन)\n• स्वस्थ वजन बनाए रखें\n• शराब का सेवन सीमित करें\n• धूम्रपान छोड़ें\n• DASH आहार खाएं\n• ध्यान या योग से तनाव प्रबंधित करें\n\n💊 हमेशा अपने डॉक्टर के निर्देशानुसार निर्धारित दवाएं लें।"
  }

  if (lowerQuestion.includes("bmi") || lowerQuestion.includes("weight")) {
    return language === "en"
      ? "BMI (Body Mass Index) ranges:\n\n• Underweight: Below 18.5\n• Normal weight: 18.5 - 24.9\n• Overweight: 25 - 29.9\n• Obese: 30 and above\n\n📊 BMI = Weight (kg) / Height² (m²)\n\nNote: BMI doesn't account for muscle mass, bone density, or body composition. Consult a healthcare provider for a comprehensive health assessment."
      : language === "ta"
        ? "BMI (உடல் நிறை குறியீட்டு) வரம்புகள்:\n\n• குறைந்த எடை: 18.5க்கு கீழே\n• சாதாரண எடை: 18.5 - 24.9\n• அதிக எடை: 25 - 29.9\n• உடல் பருமன்: 30 மற்றும் அதற்கு மேல்\n\n📊 BMI = எடை (கிலோ) / உயரம்² (மீ²)\n\nகுறிப்பு: BMI தசை நிறை அல்லது உடல் கலவையை கணக்கில் எடுத்துக்கொள்வதில்லை."
        : "BMI (बॉडी मास इंडेक्स) रेंज:\n\n• कम वजन: 18.5 से नीचे\n• सामान्य वजन: 18.5 - 24.9\n• अधिक वजन: 25 - 29.9\n• मोटापा: 30 और उससे ऊपर\n\n📊 BMI = वजन (किलो) / ऊंचाई² (मी²)\n\nनोट: BMI मांसपेशियों या शरीर की संरचना को ध्यान में नहीं रखता।"
  }

  if (lowerQuestion.includes("water") || lowerQuestion.includes("தண்ணீர்") || lowerQuestion.includes("पानी")) {
    return language === "en"
      ? "Daily water intake recommendations:\n\n• Men: About 3.7 liters (15.5 cups) total\n• Women: About 2.7 liters (11.5 cups) total\n\nThis includes water from food and beverages. Adjust based on:\n\n• Physical activity level\n• Climate and weather\n• Health conditions\n• Pregnancy/breastfeeding\n\n💡 Tip: Check urine color - pale yellow indicates good hydration."
      : language === "ta"
        ? "தினசரி தண்ணீர் உட்கொள்ள பரிந்துரைகள்:\n\n• ஆண்கள்: சுமார் 3.7 லிட்டர்\n• பெண்கள்: சுமார் 2.7 லிட்டர்\n\nஇதில் உணவு மற்றும் பானங்களிலிருந்து வரும் தண்ணீரும் அடங்கும்.\n\n💡 குறிப்பு: சிறுநீர் நிறத்தை சரிபார்க்கவும் - வெளிர் மஞ்சள் நல்ல நீரேற்றத்தை குறிக்கிறது."
        : "दैनिक पानी सेवन की सिफारिशें:\n\n• पुरुष: लगभग 3.7 लीटर\n• महिलाएं: लगभग 2.7 लीटर\n\nइसमें भोजन और पेय पदार्थों से पानी शामिल है।\n\n💡 टिप: मूत्र का रंग जांचें - हल्का पीला अच्छे हाइड्रेशन को दर्शाता है।"
  }

  // Default response
  return language === "en"
    ? "Thank you for your question. Based on general health guidelines:\n\nI recommend consulting with a healthcare professional for personalized medical advice. In the meantime, you can:\n\n• Use our Symptom Analyzer for preliminary assessment\n• Check our First Aid Guide for emergency information\n• Review Health Tips for preventive care\n\n⚠️ This AI assistant provides general health information only and is not a substitute for professional medical advice."
    : language === "ta"
      ? "உங்கள் கேள்விக்கு நன்றி. பொதுவான சுகாதார வழிகாட்டுதல்களின் அடிப்படையில்:\n\nதனிப்பட்ட மருத்துவ ஆலோசனைக்கு சுகாதார நிபுணரை அணுகுமாறு பரிந்துரைக்கிறேன்.\n\n• ஆரம்ப மதிப்பீட்டிற்கு எங்கள் அறிகுறி பகுப்பாய்வியைப் பயன்படுத்தவும்\n• அவசர தகவலுக்கு எங்கள் முதலுதவி வழிகாட்டியைப் பார்க்கவும்\n\n⚠️ இந்த AI உதவியாளர் பொதுவான சுகாதார தகவலை மட்டுமே வழங்குகிறது."
      : "आपके प्रश्न के लिए धन्यवाद। सामान्य स्वास्थ्य दिशानिर्देशों के आधार पर:\n\nमैं व्यक्तिगत चिकित्सा सलाह के लिए स्वास्थ्य पेशेवर से परामर्श करने की सलाह देता हूं।\n\n• प्रारंभिक मूल्यांकन के लिए हमारे लक्षण विश्लेषक का उपयोग करें\n• आपातकालीन जानकारी के लिए हमारी प्राथमिक चिकित्सा गाइड देखें\n\n⚠️ यह AI सहायक केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है।"
}

export default function AIAssistantPage() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        language === "en"
          ? "Hello! I'm VitalEdge AI Assistant. I can help answer your health-related questions, provide general medical information, and guide you to appropriate resources. How can I assist you today?\n\n⚠️ Note: I provide general information only. For medical emergencies, call 108 immediately."
          : language === "ta"
            ? "வணக்கம்! நான் VitalEdge AI உதவியாளர். உங்கள் சுகாதார தொடர்பான கேள்விகளுக்கு பதிலளிக்கவும், பொதுவான மருத்துவ தகவல்களை வழங்கவும், பொருத்தமான ஆதாரங்களுக்கு உங்களை வழிநடத்தவும் என்னால் உதவ முடியும். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?\n\n⚠️ குறிப்பு: நான் பொதுவான தகவல்களை மட்டுமே வழங்குகிறேன். மருத்துவ அவசரநிலைகளுக்கு, உடனடியாக 108 ஐ அழைக்கவும்."
            : "नमस्ते! मैं VitalEdge AI सहायक हूं। मैं आपके स्वास्थ्य संबंधी प्रश्नों का उत्तर देने, सामान्य चिकित्सा जानकारी प्रदान करने और आपको उचित संसाधनों तक मार्गदर्शन करने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?\n\n⚠️ नोट: मैं केवल सामान्य जानकारी प्रदान करता हूं। चिकित्सा आपातकाल के लिए तुरंत 108 पर कॉल करें।",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: getAIResponse(userMessage.content, language),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 max-w-4xl">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary mb-4">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === "en" && "AI Health Assistant"}
                {language === "ta" && "AI சுகாதார உதவியாளர்"}
                {language === "hi" && "AI स्वास्थ्य सहायक"}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {language === "en" && "Chat with AI Assistant"}
              {language === "ta" && "AI உதவியாளருடன் அரட்டை"}
              {language === "hi" && "AI सहायक के साथ चैट करें"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {language === "en" && "Get instant answers to your health questions. Available 24/7."}
              {language === "ta" && "உங்கள் சுகாதார கேள்விகளுக்கு உடனடி பதில்களைப் பெறுங்கள். 24/7 கிடைக்கும்."}
              {language === "hi" && "अपने स्वास्थ्य प्रश्नों के तत्काल उत्तर प्राप्त करें। 24/7 उपलब्ध।"}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20 mb-6">
            <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {language === "en" &&
                "This AI assistant provides general health information only. It is not a substitute for professional medical advice, diagnosis, or treatment. For emergencies, call 108."}
              {language === "ta" &&
                "இந்த AI உதவியாளர் பொதுவான சுகாதார தகவல்களை மட்டுமே வழங்குகிறது. இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. அவசரநிலைகளுக்கு, 108 ஐ அழைக்கவும்."}
              {language === "hi" &&
                "यह AI सहायक केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है। आपातकाल के लिए 108 पर कॉल करें।"}
            </p>
          </div>

          {/* Chat Container */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              {/* Messages */}
              <ScrollArea ref={scrollRef} className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-muted">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            {language === "en" && "Thinking..."}
                            {language === "ta" && "சிந்திக்கிறது..."}
                            {language === "hi" && "सोच रहा है..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              <div className="border-t p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === "en" && "Quick questions:"}
                  {language === "ta" && "விரைவு கேள்விகள்:"}
                  {language === "hi" && "त्वरित प्रश्न:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions[language].slice(0, 4).map((question, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 bg-transparent"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {question.length > 30 ? question.slice(0, 30) + "..." : question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder={
                      language === "en"
                        ? "Ask a health question..."
                        : language === "ta"
                          ? "சுகாதார கேள்வி கேளுங்கள்..."
                          : "स्वास्थ्य प्रश्न पूछें..."
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!input.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
