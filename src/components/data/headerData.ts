export const createHeaderData = (lang: string) => ({
  headerData: [
    {
      titleEn: "Exams",
      titleHin: "परीक्षाएँ",
      allUsersAccess: true,
      url: `/${lang}/exams`,
      isChild: true,
    },
    {
      titleEn: "Free Mocks",
      titleHin: "निःशुल्क मॉक टेस्ट",
      allUsersAccess: true,
      url: `/${lang}/free-mocks`,
      isChild: false,
    },
    {
      titleEn: "Our Plans",
      titleHin: "हमारी योजनाएँ",
      allUsersAccess: true,
      url: `/${lang}/our-plans`,
      isChild: false,
    },
    {
      titleEn: "Editorials Corner",
      titleHin: "संपादकीय अनुभाग",
      allUsersAccess: true,
      url: `/${lang}/editorials-corner`,
      isChild: false,
    },
      {
      titleEn: "Resources",
      titleHin: "संसाधन",
      allUsersAccess: false,
      url: `/${lang}/resources`,
      isChild: false,
    }
  ],

  moreOptionData: [
    {
      titleEn: "Success Story",
      titleHin: "सफलता की कहानी",
      allUsersAccess: false,
      url: `/${lang}/success-story`,
      isChild: false,
    },
    {
      titleEn: "Current Affairs",
      titleHin: "समसामयिक घटनाएँ",
      allUsersAccess: false,
      url: `/${lang}/current-affairs`,
      isChild: false,
    }
  
  ],

  // 📱 Tablet Header
  headerDataTablet: [
    {
      titleEn: "Exams",
      titleHin: "परीक्षाएँ",
      allUsersAccess: true,
      url: `/${lang}/exams`,
      isChild: true,
    },
    {
      titleEn: "Free Mocks",
      titleHin: "निःशुल्क मॉक टेस्ट",
      allUsersAccess: true,
      url: `/${lang}/free-mocks`,
      isChild: false,
    },
    {
      titleEn: "Our Plans",
      titleHin: "हमारी योजनाएँ",
      allUsersAccess: true,
      url: `/${lang}/our-plans`,
      isChild: false,
    },
  ],

  moreOptionDataTablet: [
  
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
