export const createHeaderData = (lang: string) => ({
  headerData: [
    {
      titleEn: "Dashboard",
      titleHin: "डैशबोर्ड",
      allUsersAccess: true,
      url: `/${lang}`,
    },
    {
      titleEn: "Exams",
      titleHin: "परीक्षाएँ",
      allUsersAccess: true,
      url: `/${lang}/exams`,
    },
    {
      titleEn: "Free Mocks",
      titleHin: "निःशुल्क मॉक टेस्ट",
      allUsersAccess: true,
      url: `/${lang}/free-mocks`,
    },
    {
      titleEn: "Our Plans",
      titleHin: "हमारी योजनाएँ",
      allUsersAccess: true,
      url: `/${lang}/our-plans`,
    },
    {
      titleEn: "Editorials Corner",
      titleHin: "संपादकीय अनुभाग",
      allUsersAccess: true,
      url: `/${lang}/editorials-corner`,
    },
  ],

  moreOptionData: [
    {
      titleEn: "Success Story",
      titleHin: "सफलता की कहानी",
      allUsersAccess: false,
      url: `/${lang}/success-story`,
    },
    {
      titleEn: "Current Affairs",
      titleHin: "समसामयिक घटनाएँ",
      allUsersAccess: false,
      url: `/${lang}/current-affairs`,
    },
    {
      titleEn: "Resources",
      titleHin: "संसाधन",
      allUsersAccess: false,
      url: `/${lang}/resources`,
    },
  ],

  // 📱 Tablet Header
  headerDataTablet: [
    {
      titleEn: "Dashboard",
      titleHin: "डैशबोर्ड",
      allUsersAccess: true,
      url: `/${lang}`,
    },
    {
      titleEn: "Exams",
      titleHin: "परीक्षाएँ",
      allUsersAccess: true,
      url: `/${lang}/exams`,
    },
    {
      titleEn: "Free Mocks",
      titleHin: "निःशुल्क मॉक टेस्ट",
      allUsersAccess: true,
      url: `/${lang}/free-mocks`,
    },
  ],

  moreOptionDataTablet: [
    {
      titleEn: "Our Plans",
      titleHin: "हमारी योजनाएँ",
      allUsersAccess: true,
      url: `/${lang}/our-plans`,
    },
    {
      titleEn: "Editorials Corner",
      titleHin: "संपादकीय अनुभाग",
      allUsersAccess: true,
      url: `/${lang}/editorials-corner`,
    },
    {
      titleEn: "Success Story",
      titleHin: "सफलता की कहानी",
      allUsersAccess: false,
      url: `/${lang}/success-story`,
    },
    {
      titleEn: "Current Affairs",
      titleHin: "समसामयिक घटनाएँ",
      allUsersAccess: false,
      url: `/${lang}/current-affairs`,
    },
    {
      titleEn: "Resources",
      titleHin: "संसाधन",
      allUsersAccess: false,
      url: `/${lang}/resources`,
    },
  ],
})
