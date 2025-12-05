import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Smartphone, Palette, Code, Cog, Shield, Rocket } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile apps built with Flutter for exceptional performance, consistently at 60fps.",
    accent: "blue"
  },
  {
    icon: Palette,
    title: "Design & Experience",
    description: "User-first, consistent design that prioritizes delightful experiences.",
    accent: "purple"
  },
  {
    icon: Code,
    title: "Product Strategy",
    description: "From concept to launch, we conduct user research interviews to build the app collaboratively.",
    accent: "green"
  },
  {
    icon: Cog,
    title: "Backend & APIs",
    description: "Horizontally scaleable Firebase backend solutions and serverless functions.",
    accent: "orange"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing combined with a battle tested SDK and CI/CD pipeline.",
    accent: "indigo"
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description: "From app store submission to ongoing monthly updates, we keep our apps fresh.",
    accent: "pink"
  }
];

const accentColors = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600", 
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  indigo: "from-indigo-500 to-indigo-600",
  pink: "from-pink-500 to-pink-600"
};

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl text-gray-900 tracking-tight mb-6 font-semibold">
            What We Do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We create delightful, useful mobile apps while fostering a peaceful and inspiring workspace.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full glass hover:shadow-lg transition-all duration-300 group rounded-3xl p-8">
                <CardContent className="p-0">
                  <div className="w-14 h-14 rounded-2xl bg-gray-900 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl text-gray-900 mb-4 font-medium">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}