import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Target, Zap, Users, Shield, Code, Palette } from "lucide-react";

const values = [
  { 
    icon: Target, 
    title: "User First", 
    description: "We start with the user. We judge outcomes by how much they benefit users.", 
    color: "text-blue-600",
    bgColor: "from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-200"
  },
  { 
    icon: Zap, 
    title: "Self expression", 
    description: "We create a safe space to share ideas. We embrace and celebrate diversity.", 
    color: "text-purple-600",
    bgColor: "from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-200"
  },
  { 
    icon: Palette, 
    title: "Apps with Texture", 
    description: "We believe in creating apps that feel tactile, rich, and deeply engaging.", 
    color: "text-pink-600",
    bgColor: "from-pink-500/10 to-pink-600/10",
    borderColor: "border-pink-200"
  },
  { 
    icon: Users, 
    title: "Teamwork", 
    description: "We know we succeed as a team. We prioritize helping and unblocking each other.", 
    color: "text-green-600",
    bgColor: "from-green-500/10 to-green-600/10",
    borderColor: "border-green-200"
  },
  { 
    icon: Code, 
    title: "Growth", 
    description: "We actively seek feedback and receive it with a growth mindset.", 
    color: "text-orange-600",
    bgColor: "from-orange-500/10 to-orange-600/10",
    borderColor: "border-orange-200"
  },
  { 
    icon: Shield, 
    title: "Ethical & Respectful", 
    description: "We build things we personally would use. We treat everyone with candor and respect.", 
    color: "text-indigo-600",
    bgColor: "from-indigo-500/10 to-indigo-600/10",
    borderColor: "border-indigo-200"
  }
];

export function ValuesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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
              delay: i * 0.3,
            }}
          >
            {['💫', '🎨', '❤️', '⚡', '🚀', '✨'][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl text-gray-900 tracking-tight mb-6">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we build, from the first line of code to the final user experience.
          </p>
          
          {/* Indie developer motto */}
          <motion.div 
            className="mt-8 inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl px-6 py-3 border border-purple-200"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-lg font-medium text-gray-700">
              <span className="text-purple-600">how to be <b>Chunky</b></span>
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <Card className={`p-8 text-center border-0 bg-gradient-to-br ${value.bgColor} hover:shadow-xl hover:shadow-black/5 transition-all duration-300 rounded-3xl ${value.borderColor} border backdrop-blur-sm`}>
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                </motion.div>
                <h3 className="text-xl text-gray-900 mb-4 font-semibold">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom inspiration section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

        </motion.div>
      </div>
    </section>
  );
}