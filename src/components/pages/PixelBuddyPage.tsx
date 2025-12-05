import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Palette, Zap, Heart, Users, Smartphone, Shield } from "lucide-react";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";

import pixelBuddyLogo from '../../assets/pixel_buddy_logo.png';
import pixelBuddyScreenshot from '../../assets/pixel_buddy_ss.png';
import googlePlayButtonImg from '../../assets/play_store_logo.png';
import appStoreButtonImg from '../../assets/app_store_logo.png';

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface PixelBuddyPageProps {
  onBack?: () => void;
  onAppClick?: (app: AppPage) => void;
}

export function PixelBuddyPage({ onBack, onAppClick }: PixelBuddyPageProps) {
  const handlePlayStoreClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.chunkytofustudios.pixel_buddy", "_blank");
  };

  const handleAppStoreClick = () => {
    window.open("https://apps.apple.com/us/app/pixel-buddy-coloring-book/id6451399345?uo=4", "_blank");
  };

  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Original handmade art",
      description: "Fun, colorful, unique pixel-art! We have simple, illustrative, or realistic artwork pieces you can pick from."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Paint like Picasso",
      description: "The intuitive UI makes it super easy to paint art in minutes. Hold and drag to enter speed painting mode!"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Relax and decompress",
      description: "No stress painting. Paint while watching TV, or on the bus. Great way to relax and be creative."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Create your own",
      description: "Would you like to paint your dog? Or a dog in space? Just upload any picture and convert it to pixel art!"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe and secure",
      description: "All artwork is curated in house, nothing inappropriate here. Plus your own paintings will always remain private."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "iPhone and Android",
      description: "Regardless of which phone you have you can paint some pixels to relax."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="glass border-b border-blue-200/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-gray-700 hover:bg-gray-100/80"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={pixelBuddyLogo}
                  alt="Pixel Buddy Logo"
                  className="w-10 h-10 rounded-xl shadow-lg object-contain"
                />
                <span className="text-xl font-semibold text-gray-900">Pixel Buddy</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#data-safety" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Data Safety</a>
              <a href="#privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageWithFallback
                    src={pixelBuddyLogo}
                    alt="Pixel Buddy"
                    className="w-16 h-16 rounded-2xl shadow-lg object-contain"
                  />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-semibold text-gray-900 mb-2">Pixel Buddy</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white border-0 px-2 py-1 text-sm">Free</Badge>
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 text-sm">Art & Design</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                  Pixel art - paint by number
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover the joy of digital painting with our intuitive pixel art coloring app. Create beautiful artwork one pixel at a time and express your creativity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handlePlayStoreClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <ImageWithFallback
                    src={googlePlayButtonImg}
                    alt="Get it on Google Play"
                    className="h-14 w-auto"
                  />
                </motion.button>
                <motion.button
                  onClick={handleAppStoreClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <ImageWithFallback
                    src={appStoreButtonImg}
                    alt="Download on the App Store"
                    className="h-14 w-auto"
                  />
                </motion.button>
              </div>


            </motion.div>

            {/* Right Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div 
                className="relative max-w-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src={pixelBuddyScreenshot}
                  alt="Pixel Buddy App Screenshot"
                  className="w-full h-auto rounded-3xl"
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.35))' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Why Artists Choose Pixel Buddy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the features that make Pixel Buddy the perfect creative companion for artists of all skill levels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer onAppClick={onAppClick} />
    </div>
  );
}