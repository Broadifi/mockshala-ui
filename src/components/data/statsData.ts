import { BookOpen, Library, Trophy, Users } from 'lucide-react';

export const statsSectionData = {
  sectionTitle: {
    titleEn: "India's Most Trusted Test Platform",
    titleHin: "भारत का सबसे विश्वसनीय टेस्ट प्लेटफ़ॉर्म"
  },
  sectionSubtitle: {
    titleEn:
      "Join the largest community of test-takers and achieve your dreams with our comprehensive preparation platform",
    titleHin:
      "सबसे बड़े परीक्षार्थी समुदाय से जुड़ें और हमारे व्यापक तैयारी प्लेटफ़ॉर्म के साथ अपने सपनों को साकार करें"
  },
  stats: [
    {
      key:1,
      number: "5000+",
      labelEn: "Active Students",
      labelHin: "सक्रिय छात्र",
      icon: Users,
      color: 'text-blue-600',
    },
    {
      key:2,
      number: "500+",
      labelEn: "Mock Tests",
      labelHin: "मॉक टेस्ट",
      icon: BookOpen,
      color: 'text-green-600',
    },
    {
      key:3,
      number: "95%",
      labelEn: "Success Rate",
      labelHin: "सफलता दर",
       icon: Trophy,
      color: 'text-yellow-600',
    },
    {
      key:4,
      number: "32",
      labelEn: "Packages",
      labelHin: "पैकेज",
      icon: Library,
      color: 'text-purple-600',
    }
  ]
};
