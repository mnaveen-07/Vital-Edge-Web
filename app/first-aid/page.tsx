"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import {
  Cross,
  Search,
  Heart,
  Flame,
  Droplet,
  Bone,
  Bug,
  Zap,
  ThermometerSun,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react"

const firstAidGuides = [
  {
    id: "cpr",
    icon: Heart,
    category: "critical",
    title: {
      en: "CPR (Cardiopulmonary Resuscitation)",
      ta: "CPR (இதய நுரையீரல் மறுமலர்ச்சி)",
      hi: "CPR (कार्डियोपल्मोनरी रिससिटेशन)",
    },
    description: {
      en: "For unresponsive person not breathing",
      ta: "மூச்சு விடாத மயக்கமடைந்த நபருக்கு",
      hi: "सांस न लेने वाले बेहोश व्यक्ति के लिए",
    },
    steps: {
      en: [
        "Check if the person is responsive by tapping their shoulder",
        "Call emergency services (108/112) immediately",
        "Place person on their back on a firm surface",
        "Place heel of hand on center of chest, other hand on top",
        "Push hard and fast - 100-120 compressions per minute, 2 inches deep",
        "After 30 compressions, give 2 rescue breaths if trained",
        "Continue until help arrives or person shows signs of life",
      ],
      ta: [
        "அவர்களின் தோளைத் தட்டி நபர் பதிலளிக்கிறாரா என்று சரிபார்க்கவும்",
        "உடனடியாக அவசர சேவைகளை (108/112) அழைக்கவும்",
        "நபரை உறுதியான மேற்பரப்பில் முதுகில் வைக்கவும்",
        "உள்ளங்கையின் குதிகாலை மார்பின் மையத்தில் வைக்கவும், மற்றொரு கையை மேலே வைக்கவும்",
        "கடினமாகவும் வேகமாகவும் அழுத்துங்கள் - நிமிடத்திற்கு 100-120 அழுத்தங்கள், 2 அங்குல ஆழம்",
        "30 அழுத்தங்களுக்குப் பிறகு, பயிற்சி பெற்றிருந்தால் 2 மீட்பு மூச்சுகள் கொடுங்கள்",
        "உதவி வரும் வரை அல்லது நபர் உயிர் அறிகுறிகளைக் காட்டும் வரை தொடரவும்",
      ],
      hi: [
        "उनके कंधे को थपथपाकर जांचें कि व्यक्ति प्रतिक्रियाशील है या नहीं",
        "तुरंत आपातकालीन सेवाओं (108/112) को कॉल करें",
        "व्यक्ति को सख्त सतह पर पीठ के बल लिटाएं",
        "हथेली की एड़ी छाती के बीच में रखें, दूसरा हाथ ऊपर",
        "जोर से और तेज दबाएं - प्रति मिनट 100-120 संपीड़न, 2 इंच गहरा",
        "30 संपीड़न के बाद, यदि प्रशिक्षित हैं तो 2 रेस्क्यू ब्रीथ दें",
        "मदद आने तक या व्यक्ति के जीवन के संकेत दिखने तक जारी रखें",
      ],
    },
  },
  {
    id: "burns",
    icon: Flame,
    category: "common",
    title: { en: "Burns Treatment", ta: "தீக்காயம் சிகிச்சை", hi: "जलने का उपचार" },
    description: {
      en: "For thermal, chemical, or electrical burns",
      ta: "வெப்ப, இரசாயன அல்லது மின் தீக்காயங்களுக்கு",
      hi: "थर्मल, रासायनिक या बिजली के जलने के लिए",
    },
    steps: {
      en: [
        "Remove the person from the source of burn",
        "Cool the burn under cool (not cold) running water for 10-20 minutes",
        "Remove jewelry or tight clothing near the burned area",
        "Do NOT apply ice, butter, or toothpaste to burns",
        "Cover with clean, non-fluffy material like cling film",
        "For severe burns, call emergency services immediately",
        "Keep the person warm and monitor for shock",
      ],
      ta: [
        "தீக்காய மூலத்திலிருந்து நபரை அகற்றவும்",
        "10-20 நிமிடங்கள் குளிர்ச்சியான (குளிர் அல்ல) ஓடும் நீரில் தீக்காயத்தை குளிர்விக்கவும்",
        "எரிந்த பகுதிக்கு அருகில் உள்ள நகைகள் அல்லது இறுக்கமான ஆடைகளை அகற்றவும்",
        "தீக்காயங்களில் பனி, வெண்ணெய் அல்லது பற்பசை தடவாதீர்கள்",
        "கிளிங் ஃபிலிம் போன்ற சுத்தமான, பஞ்சு இல்லாத பொருளால் மூடவும்",
        "கடுமையான தீக்காயங்களுக்கு உடனடியாக அவசர சேவைகளை அழைக்கவும்",
        "நபரை சூடாக வைத்து அதிர்ச்சியை கண்காணிக்கவும்",
      ],
      hi: [
        "व्यक्ति को जलने के स्रोत से हटाएं",
        "जले को 10-20 मिनट के लिए ठंडे (बर्फ जैसा ठंडा नहीं) बहते पानी के नीचे ठंडा करें",
        "जले हुए क्षेत्र के पास गहने या तंग कपड़े हटाएं",
        "जलने पर बर्फ, मक्खन या टूथपेस्ट न लगाएं",
        "क्लिंग फिल्म जैसी साफ, गैर-फ्लफी सामग्री से ढकें",
        "गंभीर जलने के लिए तुरंत आपातकालीन सेवाओं को कॉल करें",
        "व्यक्ति को गर्म रखें और शॉक के लिए निगरानी करें",
      ],
    },
  },
  {
    id: "choking",
    icon: AlertTriangle,
    category: "critical",
    title: { en: "Choking (Heimlich Maneuver)", ta: "மூச்சுத்திணறல் (ஹெய்ம்லிக் சூழ்ச்சி)", hi: "गला घोंटना (हेमलिच मैन्युवर)" },
    description: {
      en: "For blocked airway in conscious adults",
      ta: "நனவுள்ள பெரியவர்களின் தடைபட்ட சுவாசப்பாதைக்கு",
      hi: "सचेत वयस्कों में अवरुद्ध वायुमार्ग के लिए",
    },
    steps: {
      en: [
        "Ask 'Are you choking?' - if they can't speak, act immediately",
        "Stand behind the person and wrap your arms around their waist",
        "Make a fist with one hand, thumb side against their abdomen",
        "Position fist above navel, below ribcage",
        "Grasp fist with other hand and thrust inward and upward",
        "Repeat until object is expelled or person becomes unconscious",
        "If unconscious, begin CPR and call emergency services",
      ],
      ta: [
        "'நீங்கள் மூச்சுத்திணறலா?' என்று கேளுங்கள் - பேச முடியாவிட்டால் உடனடியாக செயல்படுங்கள்",
        "நபரின் பின்னால் நின்று அவர்களின் இடுப்பைச் சுற்றி உங்கள் கைகளை சுற்றுங்கள்",
        "ஒரு கையால் முஷ்டி செய்யுங்கள், கட்டைவிரல் பக்கம் அவர்களின் வயிற்றில்",
        "முஷ்டியை தொப்புளுக்கு மேலே, விலா எலும்புக்கு கீழே வைக்கவும்",
        "மற்றொரு கையால் முஷ்டியைப் பிடித்து உள்ளே மற்றும் மேல்நோக்கி தள்ளுங்கள்",
        "பொருள் வெளியேறும் வரை அல்லது நபர் நினைவிழக்கும் வரை மீண்டும் செய்யுங்கள்",
        "நினைவிழந்தால், CPR தொடங்கி அவசர சேவைகளை அழைக்கவும்",
      ],
      hi: [
        "'क्या आपका गला घुट रहा है?' पूछें - अगर बोल नहीं सकते, तुरंत कार्रवाई करें",
        "व्यक्ति के पीछे खड़े हों और उनकी कमर के चारों ओर अपनी बाहें लपेटें",
        "एक हाथ से मुट्ठी बनाएं, अंगूठे का पक्ष उनके पेट के खिलाफ",
        "मुट्ठी को नाभि के ऊपर, पसली के नीचे रखें",
        "दूसरे हाथ से मुट्ठी पकड़ें और अंदर और ऊपर की ओर धक्का दें",
        "जब तक वस्तु बाहर न निकल जाए या व्यक्ति बेहोश न हो जाए तब तक दोहराएं",
        "अगर बेहोश हो जाए, CPR शुरू करें और आपातकालीन सेवाओं को कॉल करें",
      ],
    },
  },
  {
    id: "bleeding",
    icon: Droplet,
    category: "common",
    title: { en: "Severe Bleeding", ta: "கடுமையான இரத்தப்போக்கு", hi: "गंभीर रक्तस्राव" },
    description: {
      en: "For cuts, wounds, and heavy bleeding",
      ta: "வெட்டுக்கள், காயங்கள் மற்றும் கடுமையான இரத்தப்போக்குக்கு",
      hi: "कट, घाव और भारी रक्तस्राव के लिए",
    },
    steps: {
      en: [
        "Call emergency services for severe bleeding",
        "Wear gloves if available to protect yourself",
        "Apply direct pressure to wound with clean cloth",
        "If blood soaks through, add more cloth on top - don't remove first",
        "Elevate the injured area above heart level if possible",
        "Apply pressure to pressure points if direct pressure fails",
        "Keep the person calm and warm; monitor for shock",
      ],
      ta: [
        "கடுமையான இரத்தப்போக்குக்கு அவசர சேவைகளை அழைக்கவும்",
        "உங்களைப் பாதுகாக்க கையுறைகள் இருந்தால் அணியுங்கள்",
        "சுத்தமான துணியால் காயத்தின் மீது நேரடி அழுத்தம் கொடுங்கள்",
        "இரத்தம் ஊறினால், மேலே அதிக துணி சேர்க்கவும் - முதலில் அகற்ற வேண்டாம்",
        "முடிந்தால் காயமடைந்த பகுதியை இதய மட்டத்திற்கு மேலே உயர்த்துங்கள்",
        "நேரடி அழுத்தம் தோல்வியடைந்தால் அழுத்த புள்ளிகளுக்கு அழுத்தம் கொடுங்கள்",
        "நபரை அமைதியாகவும் சூடாகவும் வைத்திருங்கள்; அதிர்ச்சியை கண்காணிக்கவும்",
      ],
      hi: [
        "गंभीर रक्तस्राव के लिए आपातकालीन सेवाओं को कॉल करें",
        "अपनी सुरक्षा के लिए उपलब्ध हो तो दस्ताने पहनें",
        "साफ कपड़े से घाव पर सीधा दबाव डालें",
        "अगर खून भीग जाए, ऊपर और कपड़ा लगाएं - पहले वाला न हटाएं",
        "यदि संभव हो तो घायल क्षेत्र को हृदय स्तर से ऊपर उठाएं",
        "यदि सीधा दबाव विफल हो तो दबाव बिंदुओं पर दबाव डालें",
        "व्यक्ति को शांत और गर्म रखें; शॉक के लिए निगरानी करें",
      ],
    },
  },
  {
    id: "fractures",
    icon: Bone,
    category: "common",
    title: { en: "Fractures & Sprains", ta: "எலும்பு முறிவுகள் & சுளுக்குகள்", hi: "फ्रैक्चर और मोच" },
    description: {
      en: "For broken bones and joint injuries",
      ta: "உடைந்த எலும்புகள் மற்றும் மூட்டு காயங்களுக்கு",
      hi: "टूटी हड्डियों और जोड़ों की चोटों के लिए",
    },
    steps: {
      en: [
        "Do NOT move the person unless absolutely necessary",
        "Call emergency services for suspected fractures",
        "Immobilize the injured area - don't try to straighten",
        "Apply ice wrapped in cloth to reduce swelling",
        "Elevate the injured limb if possible",
        "Check circulation below injury (pulse, color, sensation)",
        "Treat for shock - keep warm and calm",
      ],
      ta: [
        "முற்றிலும் அவசியமில்லாவிட்டால் நபரை நகர்த்த வேண்டாம்",
        "சந்தேகத்திற்குரிய எலும்பு முறிவுகளுக்கு அவசர சேவைகளை அழைக்கவும்",
        "காயமடைந்த பகுதியை நிலைநிறுத்துங்கள் - நேராக்க முயற்சிக்காதீர்கள்",
        "வீக்கத்தைக் குறைக்க துணியில் சுற்றிய பனியை தடவுங்கள்",
        "முடிந்தால் காயமடைந்த கைகால்களை உயர்த்துங்கள்",
        "காயத்திற்கு கீழே இரத்த ஓட்டத்தை சரிபார்க்கவும் (துடிப்பு, நிறம், உணர்வு)",
        "அதிர்ச்சிக்கு சிகிச்சை அளிக்கவும் - சூடாகவும் அமைதியாகவும் வைக்கவும்",
      ],
      hi: [
        "जब तक बिल्कुल जरूरी न हो व्यक्ति को हिलाएं नहीं",
        "संदिग्ध फ्रैक्चर के लिए आपातकालीन सेवाओं को कॉल करें",
        "घायल क्षेत्र को स्थिर करें - सीधा करने की कोशिश न करें",
        "सूजन कम करने के लिए कपड़े में लिपटी बर्फ लगाएं",
        "यदि संभव हो तो घायल अंग को ऊपर उठाएं",
        "चोट के नीचे संचार जांचें (नाड़ी, रंग, सनसनी)",
        "शॉक के लिए उपचार करें - गर्म और शांत रखें",
      ],
    },
  },
  {
    id: "snakebite",
    icon: Bug,
    category: "critical",
    title: { en: "Snake Bite", ta: "பாம்பு கடி", hi: "सांप का काटना" },
    description: {
      en: "For venomous or unknown snake bites",
      ta: "விஷமுள்ள அல்லது தெரியாத பாம்பு கடிக்கு",
      hi: "जहरीले या अज्ञात सांप के काटने के लिए",
    },
    steps: {
      en: [
        "Keep the person calm and still - movement spreads venom",
        "Call emergency services immediately (108/112)",
        "Remove jewelry/tight clothing near bite before swelling",
        "Keep bitten limb below heart level",
        "Do NOT cut wound, suck venom, or apply tourniquet",
        "Do NOT apply ice or immerse in cold water",
        "Note snake appearance if safely possible for identification",
      ],
      ta: [
        "நபரை அமைதியாகவும் நிலையாகவும் வைக்கவும் - இயக்கம் விஷத்தை பரப்புகிறது",
        "உடனடியாக அவசர சேவைகளை அழைக்கவும் (108/112)",
        "வீக்கத்திற்கு முன் கடிக்கு அருகில் உள்ள நகைகள்/இறுக்கமான ஆடைகளை அகற்றவும்",
        "கடிபட்ட கைகால்களை இதய மட்டத்திற்கு கீழே வைக்கவும்",
        "காயத்தை வெட்டாதீர்கள், விஷத்தை உறிஞ்சாதீர்கள் அல்லது டூர்னிக்கெட் போடாதீர்கள்",
        "பனி தடவாதீர்கள் அல்லது குளிர்ந்த நீரில் மூழ்காதீர்கள்",
        "அடையாளம் காண பாதுகாப்பாக முடிந்தால் பாம்பின் தோற்றத்தை குறிப்பிடுங்கள்",
      ],
      hi: [
        "व्यक्ति को शांत और स्थिर रखें - हिलने से जहर फैलता है",
        "तुरंत आपातकालीन सेवाओं को कॉल करें (108/112)",
        "सूजन से पहले काटने के पास गहने/तंग कपड़े हटाएं",
        "काटे गए अंग को हृदय स्तर से नीचे रखें",
        "घाव को काटें नहीं, जहर न चूसें, या टूर्निकेट न लगाएं",
        "बर्फ न लगाएं या ठंडे पानी में न डुबोएं",
        "पहचान के लिए यदि सुरक्षित रूप से संभव हो तो सांप की उपस्थिति नोट करें",
      ],
    },
  },
  {
    id: "heatstroke",
    icon: ThermometerSun,
    category: "critical",
    title: { en: "Heat Stroke", ta: "வெப்ப பக்கவாதம்", hi: "हीट स्ट्रोक" },
    description: {
      en: "For heat exhaustion and heat stroke",
      ta: "வெப்ப சோர்வு மற்றும் வெப்ப பக்கவாதத்திற்கு",
      hi: "गर्मी की थकावट और हीट स्ट्रोक के लिए",
    },
    steps: {
      en: [
        "Move person to cool, shaded area immediately",
        "Call emergency services for heat stroke (confusion, no sweating)",
        "Remove excess clothing",
        "Cool the person rapidly - wet cloths on neck, armpits, groin",
        "Fan the person while applying wet cloths",
        "Give cool water to drink if conscious and able to swallow",
        "Do NOT give aspirin or fever reducers",
      ],
      ta: [
        "நபரை உடனடியாக குளிர்ச்சியான, நிழலான பகுதிக்கு நகர்த்துங்கள்",
        "வெப்ப பக்கவாதத்திற்கு அவசர சேவைகளை அழைக்கவும் (குழப்பம், வியர்வை இல்லை)",
        "அதிகப்படியான ஆடைகளை அகற்றவும்",
        "நபரை விரைவாக குளிர்விக்கவும் - கழுத்து, அக்குள், இடுப்பு மீது ஈரத்துணிகள்",
        "ஈரத்துணிகளை தடவும்போது நபருக்கு விசிறி விடுங்கள்",
        "நினைவு இருந்தால் மற்றும் விழுங்க முடிந்தால் குளிர்ந்த தண்ணீர் குடிக்க கொடுங்கள்",
        "ஆஸ்பிரின் அல்லது காய்ச்சல் குறைப்பான்களை கொடுக்காதீர்கள்",
      ],
      hi: [
        "व्यक्ति को तुरंत ठंडी, छायादार जगह पर ले जाएं",
        "हीट स्ट्रोक के लिए आपातकालीन सेवाओं को कॉल करें (भ्रम, पसीना नहीं)",
        "अतिरिक्त कपड़े हटाएं",
        "व्यक्ति को तेजी से ठंडा करें - गर्दन, बगल, ग्रोइन पर गीले कपड़े",
        "गीले कपड़े लगाते समय व्यक्ति को पंखा करें",
        "यदि होश में हो और निगलने में सक्षम हो तो ठंडा पानी पीने को दें",
        "एस्पिरिन या बुखार कम करने वाली दवाएं न दें",
      ],
    },
  },
  {
    id: "electric-shock",
    icon: Zap,
    category: "critical",
    title: { en: "Electric Shock", ta: "மின் அதிர்ச்சி", hi: "बिजली का झटका" },
    description: {
      en: "For electrical accidents and shocks",
      ta: "மின் விபத்துகள் மற்றும் அதிர்ச்சிகளுக்கு",
      hi: "बिजली की दुर्घटनाओं और झटके के लिए",
    },
    steps: {
      en: [
        "Do NOT touch the person if still in contact with electricity",
        "Turn off power source or unplug if safe to do so",
        "Use dry non-conductive material (wood, plastic) to separate",
        "Call emergency services immediately",
        "Check breathing and pulse - begin CPR if needed",
        "Look for entry and exit burn wounds",
        "Treat for shock and keep person still until help arrives",
      ],
      ta: [
        "மின்சாரத்துடன் இன்னும் தொடர்பில் இருந்தால் நபரைத் தொடாதீர்கள்",
        "பாதுகாப்பாக இருந்தால் மின் மூலத்தை அணைக்கவும் அல்லது பிளக் அகற்றவும்",
        "பிரிக்க உலர்ந்த மின்கடத்தாத பொருளைப் பயன்படுத்துங்கள் (மரம், பிளாஸ்டிக்)",
        "உடனடியாக அவசர சேவைகளை அழைக்கவும்",
        "சுவாசம் மற்றும் துடிப்பை சரிபார்க்கவும் - தேவைப்பட்டால் CPR தொடங்குங்கள்",
        "நுழைவு மற்றும் வெளியேறும் தீக்காய காயங்களைப் பாருங்கள்",
        "அதிர்ச்சிக்கு சிகிச்சை அளிக்கவும், உதவி வரும் வரை நபரை நிலையாக வைக்கவும்",
      ],
      hi: [
        "यदि अभी भी बिजली के संपर्क में है तो व्यक्ति को न छुएं",
        "यदि सुरक्षित हो तो पावर स्रोत बंद करें या अनप्लग करें",
        "अलग करने के लिए सूखी गैर-प्रवाहकीय सामग्री (लकड़ी, प्लास्टिक) का उपयोग करें",
        "तुरंत आपातकालीन सेवाओं को कॉल करें",
        "सांस और नाड़ी जांचें - जरूरत हो तो CPR शुरू करें",
        "प्रवेश और निकास जले के घाव देखें",
        "शॉक के लिए उपचार करें और मदद आने तक व्यक्ति को स्थिर रखें",
      ],
    },
  },
]

export default function FirstAidPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedGuide, setExpandedGuide] = useState<string | null>("cpr")

  const filteredGuides = firstAidGuides.filter(
    (guide) =>
      guide.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emergency/10 px-4 py-2 text-emergency mb-4">
              <Cross className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === "en" && "First Aid Guide"}
                {language === "ta" && "முதலுதவி வழிகாட்டி"}
                {language === "hi" && "प्राथमिक चिकित्सा गाइड"}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {language === "en" && "Emergency First Aid"}
              {language === "ta" && "அவசர முதலுதவி"}
              {language === "hi" && "आपातकालीन प्राथमिक चिकित्सा"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {language === "en" && "Step-by-step guides for common medical emergencies. Learn to save lives."}
              {language === "ta" && "பொதுவான மருத்துவ அவசரநிலைகளுக்கான படிப்படியான வழிகாட்டிகள். உயிர்களைக் காப்பாற்ற கற்றுக்கொள்ளுங்கள்."}
              {language === "hi" && "सामान्य चिकित्सा आपात स्थितियों के लिए चरण-दर-चरण गाइड। जीवन बचाना सीखें।"}
            </p>
          </div>

          {/* Emergency Call Banner */}
          <Card className="mb-8 border-emergency/20 bg-emergency/5">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-emergency" />
                <div>
                  <p className="font-semibold text-emergency">
                    {language === "en" && "Emergency? Call immediately!"}
                    {language === "ta" && "அவசரமா? உடனடியாக அழைக்கவும்!"}
                    {language === "hi" && "आपातकाल? तुरंत कॉल करें!"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" && "India: 108 (Ambulance) | 112 (Emergency)"}
                    {language === "ta" && "இந்தியா: 108 (ஆம்புலன்ஸ்) | 112 (அவசரம்)"}
                    {language === "hi" && "भारत: 108 (एम्बुलेंस) | 112 (आपातकाल)"}
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="lg" asChild>
                <a href="tel:108">
                  <Phone className="mr-2 h-5 w-5" />
                  108
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={
                language === "en"
                  ? "Search first aid guides..."
                  : language === "ta"
                    ? "முதலுதவி வழிகாட்டிகளைத் தேடுங்கள்..."
                    : "प्राथमिक चिकित्सा गाइड खोजें..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Guides */}
          <div className="space-y-4">
            {filteredGuides.map((guide) => {
              const Icon = guide.icon
              const isExpanded = expandedGuide === guide.id

              return (
                <Card key={guide.id} className="border-0 shadow-sm overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${guide.category === "critical" ? "bg-emergency/10" : "bg-primary/10"}`}
                        >
                          <Icon
                            className={`h-6 w-6 ${guide.category === "critical" ? "text-emergency" : "text-primary"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{guide.title[language]}</CardTitle>
                            {guide.category === "critical" && (
                              <Badge variant="destructive" className="text-xs">
                                {language === "en" && "Critical"}
                                {language === "ta" && "அவசரம்"}
                                {language === "hi" && "गंभीर"}
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{guide.description[language]}</CardDescription>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="border-t bg-muted/30 pt-6">
                      <ol className="space-y-3">
                        {guide.steps[language].map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                              {index + 1}
                            </span>
                            <span className="text-sm leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
