import { Card, CardContent } from '@/components/ui/card'
import {
  BarChart3,
  Clock,
  HeadphonesIcon,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import React from 'react'

function WhyChoose() {
  const features = [
    {
      title: 'AI-Powered Analytics',
      description:
        'Get detailed performance insights with our advanced AI algorithms that analyze your strengths and weaknesses',
      icon: BarChart3,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Instant Results',
      description:
        'Get your test results immediately after submission with detailed explanations for every question',
      icon: Zap,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: '24/7 Doubt Support',
      description:
        'Connect with expert faculty anytime for doubt resolution and personalized guidance',
      icon: HeadphonesIcon,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Secure & Reliable',
      description:
        'Bank-grade security ensures your data is safe and tests are conducted in a secure environment',
      icon: Shield,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Mobile Optimized',
      description:
        'Take tests seamlessly on any device - mobile, tablet, or desktop with our responsive design',
      icon: Smartphone,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      title: 'Time Management',
      description:
        'Master time management with our timer features and time-based analytics to improve speed',
      icon: Clock,
      color: 'bg-red-100 text-red-600',
    },
  ]

  // Parent container animation (stagger)
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  // Card animation (FIXED)
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], 
      },
    },
  }

  return (
    <div className="w-full px-4 py-6 md:py-12 max-w-7xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center md:text-start mb-12 space-y-2"
      >
        <h3 className="text-2xl xl:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Why Choose MockShala?
        </h3>
        <p className="text-sm xl:text-base text-gray-600 max-w-2xl">
          Experience the most advanced and comprehensive test preparation
          platform designed for Indian competitive exams
        </p>
      </motion.div>

      {/* FEATURE GRID */}
    <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4  }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
        {features.map((feature) => (
        <motion.div
        key={feature.title}
        variants={cardVariants}
        className="h-full"
        >
        <Card className="h-full group bg-white/80 backdrop-blur-md 
          border border-gray-200 transition-all duration-300
           hover:-translate-y-2 hover:shadow-xl text-center">
            <CardContent className="px-4 md:p-6 h-full flex flex-col ">
              <div className='w-full flex justify-center items-center'>
                <div
                    className={`h-10 w-10 md:w-12 md:h-12 rounded-xl ${feature.color} 
                      flex items-center justify-center mb-4 
                      group-hover:scale-110 transition-transform 
                      duration-300`}
                >
                    <feature.icon className=" md:h-6 md:w-6" />
                </div>
              </div>

              <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3
              group-hover:text-blue-600 transition-colors">
                  {feature.title}
              </h4>

              <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-auto">
                  {feature.description}
              </p>
            </CardContent>
        </Card>
        </motion.div>
    ))}
    </motion.div>

    </div>
  )
}

export default WhyChoose
