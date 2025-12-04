import { motion } from "motion/react";
import { Globe, Code, Heart, Zap } from "lucide-react";

export function TeamSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.02, 0.08, 0.02],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {['👩‍💻', '👨‍💻', '🌍', '💻', '🚀', '⚡'][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-6">
            Our Global Studio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A distributed team of passionate indie developers working across six cities, united by our mission 
            to create apps with texture and rediscover the joy of coding together.
          </p>

          {/* Global cities showcase */}
          <motion.div
            className="flex justify-center items-center gap-4 flex-wrap mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {["San Francisco", "Princeton", "Dublin", "Istanbul", "Mexico City", "Milan"].map((city, index) => (
              <motion.div
                key={city}
                className="bg-gradient-to-r from-gray-50 to-white px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                {city}
              </motion.div>
            ))}
          </motion.div>

          {/* Global presence indicator */}
          <motion.div
            className="flex justify-center items-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 px-4 py-2 rounded-full border border-blue-200">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">6 Cities</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-green-600/10 px-4 py-2 rounded-full border border-green-200">
              <Code className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Indie Spirit</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-pink-600/10 px-4 py-2 rounded-full border border-pink-200">
              <Heart className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium text-gray-700">Love for Code</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Team culture section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 border border-gray-200/50 shadow-xl shadow-gray-500/5">
            <motion.div
              className="max-w-4xl mx-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">
                Our Indie Developer Culture
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We believe in the power of small teams creating big impact. Our distributed approach 
                allows us to work with the best talent while maintaining the close-knit culture of 
                indie developers who truly care about craft, texture, and user experience.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm text-gray-600">User-First</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-gray-600">High Agency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🤝</div>
                  <div className="text-sm text-gray-600">Teamwork</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-sm text-gray-600">Growth</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}