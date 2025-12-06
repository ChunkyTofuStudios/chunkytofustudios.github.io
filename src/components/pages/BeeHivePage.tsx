import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, Zap, TrendingUp, Target, Gamepad2, Trophy, Clock } from "lucide-react";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate, useLocation } from "react-router-dom";
import { LinkButton } from "../ui/link-button";

import beehiveLogo from '../../assets/beehive_logo.png';
import beehiveScreenshot from '../../assets/beehive_ss.png';
import googlePlayButtonImg from '../../assets/play_store_logo.png';
import appStoreButtonImg from '../../assets/app_store_logo.png';

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface BeehivePageProps {
  onBack?: () => void;
  onAppClick?: (app: AppPage) => void;
}

export function BeehivePage({ onBack, onAppClick }: BeehivePageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlePlayStoreClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.chunkytofustudios.beehive&hl=en_IE", "_blank");
  };

  const handleAppStoreClick = () => {
    window.open("https://testflight.apple.com/join/5WeUgnQ1", "_blank");
  };

  const navPages = [
    { path: '/beehive/data-safety', label: 'Data Safety' },
    { path: '/beehive/privacy-policy', label: 'Privacy Policy' },
    { path: '/beehive/terms-and-conditions', label: 'Terms & Conditions' },
  ];

  const isCurrentPage = (path: string) => location.pathname === path;

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Start Your Daily Word Buzz",
      description: "Kickstart your day with our exciting daily word challenges. Just open the app, tap on the challenge, and let the fun begin! Beehive makes sure every day is a new adventure in the world of words."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Get a Helping Wing",
      description: "Stuck on a tricky word? No worries! Use hints and power-ups to give you that extra boost. Earn or purchase these handy tools to help you crack even the toughest puzzles with ease."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Your Journey",
      description: "See your progress fly! Our app lets you track your daily, weekly, and monthly achievements on a colourful dashboard. Watch your skills grow as you collect more honeycombs and climb the ranks."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Rise to the Top",
      description: "Compete with friends and word lovers around the globe. Check out the leaderboards to see where you stand. Strive to become the top bee in the hive. Unlock achievements as you go and show off your word prowess."
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Choose Your Hive",
      description: "How do you like to play? Pick from various game modes like solo play, buzzing multiplayer competitions, and themed rounds. Customise your game to suit your mood and skill level, ensuring every game is fresh and exciting."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Buzz Everywhere",
      description: "No matter where you are, Beehive is ready to play. Available on both iOS and Android, our game works seamlessly on any device. So, whether you're at home or on the go, the fun never stops."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="glass border-b border-orange-200/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {onBack && (
                <LinkButton
                  to="/"
                  onNavigate={onBack}
                  className="no-underline"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:bg-gray-100/80"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </LinkButton>
              )}
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={beehiveLogo}
                  alt="Beehive Logo"
                  className="w-10 h-10 rounded-xl shadow-lg object-contain"
                />
                <span className="text-xl font-semibold text-gray-900">Beehive</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-2">
              {navPages.map((page) => (
                <LinkButton
                  key={page.path}
                  to={page.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline ${
                    isCurrentPage(page.path)
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-white/80'
                  }`}
                >
                  {page.label}
                </LinkButton>
              ))}
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
                    src={beehiveLogo}
                    alt="Beehive"
                    className="w-16 h-16 rounded-2xl shadow-lg object-contain"
                  />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-semibold text-gray-900 mb-2">Beehive</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white border-0 px-2 py-1 text-sm">Free</Badge>
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-yellow-50 text-sm">Games</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                  Buzz into the World of Words with Beehive
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Are you ready to add some buzz to your brain? Beehive is not just a game—it's your daily dose of fun and learning wrapped into one.
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
                className="relative max-w-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))' }}
              >
                <ImageWithFallback
                  src={beehiveScreenshot}
                  alt="Beehive App Screenshot"
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-yellow-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Why Players Love Beehive
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes Beehive the perfect word puzzle companion for players around the world.
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
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
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