import { Card, CardContent } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { featuresData } from "@/components/data/featuresData";

function WhyChoose() {
  // Fetch language param
  const { lang } = useParams({ strict: false });

  // Detect mobile screen
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Parent container animation
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.08,
      },
    },
  };

  // Card animation
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 16,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.45 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="w-full container px-4 py-5 mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: isMobile ? 0.3 : 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center md:text-start mb-12 space-y-2"
      >
        <h3 className="text-2xl xl:text-4xl py-2 font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
          {lang === "hi"
            ? featuresData.sectionTitle.titleHin
            : featuresData.sectionTitle.titleEn}
        </h3>

        <p className="text-sm xl:text-base text-gray-600 max-w-2xl">
          {lang === "hi"
            ? featuresData.sectionSubtitle.titleHin
            : featuresData.sectionSubtitle.titleEn}
        </p>
      </motion.div>

      {/* FEATURE GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: isMobile ? 0.15 : 0.4,
        }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10"
      >
        {featuresData.features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={cardVariants}
            className="h-full"
          >
            <Card className="h-full group bg-white/80 backdrop-blur-md border border-gray-200 text-center">
              <CardContent className="px-4 md:p-6 h-full flex flex-col">
                <div className="w-full flex justify-center items-center">
                  <div
                    className={`h-10 w-10 md:w-12 md:h-12 rounded-xl ${feature.color}
                    flex items-center justify-center mb-4 transition-transform duration-300`}
                  >
                    <feature.icon className="md:h-6 md:w-6" />
                  </div>
                </div>

                <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">
                  {lang === "hi" ? feature.titleHin : feature.titleEn}
                </h4>

                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-auto">
                  {lang === "hi"
                    ? feature.descriptionHin
                    : feature.descriptionEn}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default WhyChoose;
