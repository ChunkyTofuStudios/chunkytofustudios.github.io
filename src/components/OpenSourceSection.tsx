import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Package, Heart, Star, Download, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "native_geofence",
    description: "Battery efficient Flutter Geofencing that uses native iOS and Android APIs.",
    version: "v1.2.0",
    downloads: "2.34k",
    likes: "33",
    points: "160",
    category: "Location",
    tags: ["Flutter", "Geofencing", "Android", "iOS"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    name: "play_install_referrer",
    description: "A Flutter plugin for the Android Play Install Referrer API. You can use it to securely retrieve referral content from Google Play.",
    version: "v0.5.0",
    downloads: "8.55k",
    likes: "5",
    points: "160",
    category: "Analytics",
    tags: ["Flutter", "Android", "Google Play"],
    color: "from-green-500 to-emerald-600"
  },
  {
    name: "firebase_auth_games_services",
    description: "Enables logging into Firebase using Android Play Games and iOS Game Center.",
    version: "v3.0.1",
    downloads: "170",
    likes: "6",
    points: "160",
    category: "Authentication",
    tags: ["Flutter", "Android", "iOS", "Firebase", "Google Play Games", "Game Center"],
    color: "from-purple-500 to-pink-600"
  },
  {
    name: "native_virtual_keyboard",
    description: "An almost pixel perfect Flutter replica of iOS and Android native keyboards.",
    version: "v0.1.2",
    downloads: "134",
    likes: "0",
    points: "160",
    category: "User Interface",
    tags: ["Flutter", "Android", "iOS", "Linux", "MacOS", "Web", "Windows"],
    color: "from-orange-500 to-orange-600"
  },
];

export function OpenSourceSection() {
  const handlePubDevClick = () => {
    window.open('https://pub.dev/publishers/chunkytofustudios.com/packages', '_blank', 'noopener,noreferrer');
  };

  const handlePackageClick = (packageName: string) => {
    window.open(`https://pub.dev/packages/${packageName}`, '_blank', 'noopener,noreferrer');
  };

  const handleContactForBusiness = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl opacity-5"
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
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            📦
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
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <h2 className="text-6xl md:text-7xl text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text bg-[length:200%_auto] tracking-tight mb-6">
              Open Source
            </h2>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We believe in sharing our craft with the developer community. 
            Explore our open source packages and libraries, built with the same texture and care as our apps.
          </p>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 text-sm">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">40+</div>
              <div className="text-gray-600 text-sm">Community Likes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">4</div>
              <div className="text-gray-600 text-sm">Active Packages</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Pub.dev Showcase */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="p-6 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-300 text-sm font-mono">pub.dev/publishers/chunkytofustudios.com</div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
              onClick={() => window.open('https://pub.dev/publishers/chunkytofustudios.com/packages', '_blank', 'noopener,noreferrer')}
            >

            </motion.div>
          </div>
        </motion.div>

        {/* Featured Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 rounded-3xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${pkg.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Package className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 truncate">{pkg.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {pkg.version}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={`hidden sm:inline-flex bg-gradient-to-r ${pkg.color} text-white border-0`}>
                      {pkg.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">{pkg.downloads}</span>
                      <span className="text-xs text-gray-500">downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{pkg.likes}</span>
                      <span className="text-xs text-gray-500">likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{pkg.points}</span>
                      <span className="text-xs text-gray-500">points</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tagIndex}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="text-xs border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors rounded-full"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePackageClick(pkg.name)}
                      className="w-full border-gray-200 hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on pub.dev
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Business Integration CTA */}
        <motion.div
          className="text-center"
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