import { statsSectionData } from '@/components/data/statsData';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from '@tanstack/react-router';


function Stats() {
//     const stats = [
//   {
//     number: '5000+',
//     label: 'Active Students',
//     icon: Users,
//     color: 'text-blue-600',
//   },
//   {
//     number: '500+',
//     label: 'Mock Tests',
//     icon: BookOpen,
//     color: 'text-green-600',
//   },
//   {
//     number: '95%',
//     label: 'Success Rate',
//     icon: Trophy,
//     color: 'text-yellow-600',
//   },
//   {
//     number: '32',
//     label: 'Packages',
//     icon: Library,
//     color: 'text-purple-600',
//   },
// ];

  const { lang } = useParams({ strict: false })

  return (
    <div className="w-full px-4 py-5 container mx-auto">
        {/* Stats Section */}
        <div className='text-start'>
        
        <div className='text-center md:text-start mb-12 space-y-1'>
            <h3 className="text-2xl xl:text-4xl py-1 font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             {lang === "hi"
              ? statsSectionData.sectionTitle.titleHin
              : statsSectionData.sectionTitle.titleEn}
            </h3>
            <p className="text-sm xl:text-base text-gray-600 max-w-2xl">        
            {lang === "hi"
              ? statsSectionData.sectionSubtitle.titleHin
              : statsSectionData.sectionSubtitle.titleEn}
            </p>

            
        </div>
          
          {/* Stats Grid */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16'>
            {statsSectionData.stats.map(stat => (
              <Card
                key={stat.key}
                className='border-0 shadow-lg hover:shadow-xl transition-shadow'
              >
                <CardContent className='px-6 py-0 md:py-4 text-center'>
                  <stat.icon className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className='text-2xl font-bold text-gray-900 dark:text-white md:mb-1'>
                    {stat.number}
                  </div>
                  <div className='text-sm text-gray-600 dark:text-gray-300'>
                     {lang === "hi" ? stat.labelHin : stat.labelEn}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Stats