import { motion } from "motion/react";
import { Briefcase, Linkedin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import orkunHeadshot from '../assets/orkun_headshot.jpg';
import yasinHeadshot from '../assets/yasin_headshot.jpg';

const cofounders = [
  {
    name: "Orkun Duman",
    title: "Co-founder & CEO",
    image: orkunHeadshot,
    linkedin: "https://www.linkedin.com/in/orkun-duman/"
  },
  {
    name: "Yasin Gunes",
    title: "Co-founder & CPO",
    image: yasinHeadshot,
    linkedin: "https://www.linkedin.com/in/yasingunes/"
  }
];

export function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {['🚀', '💡', '🎯', '✨'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-8">
            Our Story
          </h2>
          
          {/* Backstory Paragraph */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-600 leading-relaxed">
              Chunky Tofu Studios was launched in late 2024 as a side project, a way for us to work on 
              something we truly love. In 2025 we were able to go full-time, thanks to the 
              support of a group of enthusiastic part-time team members and the encouraging and lovely feedback from our users. We're now expanding 
              the studio and to bring novel AI features to gaming and daily utilities.
            </p>
          </motion.div>

          {/* Cofounders */}
          <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto">
            {cofounders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Headshot - Circular image */}
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={founder.image}
                      alt={`${founder.name} headshot`}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                    />
                  </motion.div>

                  {/* Name and Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {founder.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">
                      {founder.title}
                    </p>
                  </div>

                  {/* LinkedIn Link */}
                  <motion.a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}