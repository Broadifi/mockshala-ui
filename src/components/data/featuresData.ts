import {
  BarChart3,
  Clock,
  HeadphonesIcon,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react'

export const featuresData = 
{
  sectionTitle: {
    titleEn: "Why Choose MockShala?",
    titleHin: "MockShala क्यों चुनें?"
  },
  sectionSubtitle: {
    titleEn:
      "Experience the most advanced and comprehensive test preparation platform designed for Indian competitive exams",
    titleHin:
      "भारतीय प्रतियोगी परीक्षाओं के लिए डिज़ाइन किया गया सबसे उन्नत और व्यापक टेस्ट तैयारी प्लेटफ़ॉर्म अनुभव करें"
  },

  features: [
    {
      id:1,
      titleEn: "AI-Powered Analytics",
      titleHin: "एआई आधारित विश्लेषण",
      descriptionEn:
        "Get detailed performance insights with our advanced AI algorithms that analyze your strengths and weaknesses",
      descriptionHin:
        "उन्नत एआई एल्गोरिदम के माध्यम से अपनी ताकत और कमजोरियों का विस्तृत विश्लेषण प्राप्त करें",
       icon: BarChart3,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id:2,
      titleEn: "Instant Results",
      titleHin: "तुरंत परिणाम",
      descriptionEn:
        "Get your test results immediately after submission with detailed explanations for every question",
      descriptionHin:
        "परीक्षा सबमिट करते ही प्रत्येक प्रश्न के विस्तृत समाधान के साथ तुरंत परिणाम प्राप्त करें",
        icon: Zap,
      color: 'bg-green-100 text-green-600',
    },
    {
      id:3,
      titleEn: "24/7 Doubt Support",
      titleHin: "24/7 संदेह समाधान",
      descriptionEn:
        "Connect with expert faculty anytime for doubt resolution and personalized guidance",
      descriptionHin:
        "संदेह समाधान और व्यक्तिगत मार्गदर्शन के लिए कभी भी विशेषज्ञ शिक्षकों से जुड़ें",
        icon: HeadphonesIcon,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id:4,
      titleEn: "Secure & Reliable",
      titleHin: "सुरक्षित और विश्वसनीय",
      descriptionEn:
        "Bank-grade security ensures your data is safe and tests are conducted in a secure environment",
      descriptionHin:
        "बैंक-स्तरीय सुरक्षा आपके डेटा को सुरक्षित रखती है और परीक्षाएँ सुरक्षित वातावरण में आयोजित होती हैं",
        icon: Shield,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id:5,
      titleEn: "Mobile Optimized",
      titleHin: "मोबाइल अनुकूलित",
      descriptionEn:
        "Take tests seamlessly on any device - mobile, tablet, or desktop with our responsive design",
      descriptionHin:
        "हमारे रेस्पॉन्सिव डिज़ाइन के साथ मोबाइल, टैबलेट या डेस्कटॉप पर आसानी से परीक्षा दें",
         icon: Smartphone,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      id:6,
      titleEn: "Time Management",
      titleHin: "समय प्रबंधन",
      descriptionEn:
        "Master time management with our timer features and time-based analytics to improve speed",
      descriptionHin:
        "हमारे टाइमर फीचर्स और समय-आधारित विश्लेषण से अपनी गति और समय प्रबंधन में सुधार करें",
        icon: Clock,
      color: 'bg-red-100 text-red-600',
    }
  ]
};
