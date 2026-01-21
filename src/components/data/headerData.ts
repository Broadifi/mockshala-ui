
// Helper function to generate language-prefixed URLs
export const createHeaderData = (lang: string) => ({
  headerData: [
    {
        title: 'Dashboard',
        allUsersAccess: true,
        url: `/${lang}`
    },
    {
        title: 'Exams',
        allUsersAccess: true,
        url: `/${lang}/exams`
    },
    {
        title: 'Free Mocks',
        allUsersAccess: true,
        url: `/${lang}/free-mocks`
    },
    {
        title: 'Our Plans',
        allUsersAccess: true,
        url: `/${lang}/our-plans`
    },
    {
        title: 'Editorials Corner',
        allUsersAccess: true,
        url: `/${lang}/editorials-corner`
    }
  ],
  moreOptionData: [
    {
        title: 'Success Story',
        allUsersAccess: false,
        url: `/${lang}/success-story`
    },
    {
        title: 'Current Affairs',
        allUsersAccess: false,
        url: `/${lang}/current-affairs`
    },
    {
        title: 'Resources',
        allUsersAccess: false,
        url: `/${lang}/resources`
    },
  ],


  // ... tablet variants also with lang prefix


// Header data for Tablet view
    headerDataTablet : [
    {
        title: 'Dashboard',
        allUsersAccess: true,
        url: `/${lang}`
    },
    {
        title: 'Exams',
        allUsersAccess: true,
        url: `/${lang}/exams`,
    },
    {
        title: 'Free Mocks',
        allUsersAccess: true,
        url: `/${lang}/free-mocks`
    },
   
],


     moreOptionDataTablet : [
     {
        title: 'Our Plans',
        allUsersAccess: true,
        url: `/${lang}/our-plans`
    },
    {
        title: 'Editorials Corner',
        allUsersAccess: true,
        url: `/${lang}/editorials-corner`
    },
    {
        title: 'Success Story',
        allUsersAccess: false,
        url: `/${lang}/success-story`
    },
    {
        title: 'Current Affairs',
        allUsersAccess: false,
        url: `/${lang}/current-affairs`
    },
    {
        title: 'Resources',
        allUsersAccess: false,
        url: `/${lang}/resources`
    },
    
    
    
]
})

