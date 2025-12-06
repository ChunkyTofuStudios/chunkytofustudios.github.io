import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ArrowLeft, MapPin, Bell, BarChart3, Settings, Smartphone } from "lucide-react";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate, useLocation } from "react-router-dom";

import dozyLogo from '../../assets/dozy_logo.png';
import dozyScreenshot from '../../assets/dozy_ss.png';
import googlePlayButtonImg from '../../assets/play_store_logo.png';
import appStoreButtonImg from '../../assets/app_store_logo.png';

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface DozyPageProps {
  onBack?: () => void;
  onAppClick?: (app: AppPage) => void;
}

export function DozyPage({ onBack, onAppClick }: DozyPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlePlayStoreClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.chunkytofustudios.destiwake&utm_source=cts&utm_medium=web&utm_campaign=landingpage", "_blank");
  };

  const handleAppStoreClick = () => {
    window.open("https://apps.apple.com/us/app/dozy-commute-companion/id6736437794", "_blank");
  };

  const navPages = [
    { path: '/dozy/data-safety', label: 'Data Safety' },
    { path: '/dozy/privacy-policy', label: 'Privacy Policy' },
    { path: '/dozy/terms-and-conditions', label: 'Terms & Conditions' },
  ];

  const isCurrentPage = (path: string) => location.pathname === path;

  const features = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Set Your Wake-Up Alert",
      description: "Sleep without worry during your commute. Just enter your departure and destination stations, set how many minutes before arrival you want to wake up, and enjoy your rest. Our app ensures you wake up refreshed and on time, every time."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Live Journey Tracking",
      description: "Watch your progress unfold in real time. Our app uses GPS to show your current location on a map, so you can see exactly where you are from your destination. Travel stress-free, knowing you won't miss your stop."
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Service Updates and Notifications",
      description: "Stay informed on the go. Receive real-time updates about delays, cancellations, and service changes, directly within the app. Never be caught off guard by transit disruptions again."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customizable Alerts",
      description: "Choose how you want to be notified. Select your favorite tune or vibration pattern from our alerts. Customize how and when you are notified about approaching your final stop, so waking up is pleasant and reliable."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Trip History and Management",
      description: "Manage your commutes effortlessly. Save your frequent routes and access past trips with a simple tap. Plan your weekly commutes in advance and modify them as your schedule changes."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Available on iOS and Android",
      description: "Access anywhere, anytime. Whether you're an iPhone devotee or an Android enthusiast, our app works seamlessly across platforms, so you can count on us no matter what device you use."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="glass border-b border-purple-200/50 backdrop-blur-md">
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
                <img 
                  src={dozyLogo} 
                  alt="Dozy Logo" 
                  className="w-10 h-10 rounded-xl shadow-lg object-contain"
                />
                <span className="text-xl font-semibold text-gray-900">Dozy</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-2">
              {navPages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => navigate(page.path)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isCurrentPage(page.path)
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-white/80'
                  }`}
                >
                  {page.label}
                </button>
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
                <motion.img 
                  src={dozyLogo} 
                  alt="Dozy" 
                  className="w-16 h-16 rounded-2xl shadow-lg object-contain"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                />
                <div>
                  <h1 className="text-4xl font-semibold text-gray-900 mb-2">Dozy</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white border-0 px-2 py-1 text-sm">Free</Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50 text-sm">Transportation</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                  Smart Travel Alarm for Commuters
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Never miss your stop again with our intelligent GPS-based alarm system. Designed for commuters in New Jersey, New York, Philadelphia, Chicago, and Ireland.
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
                  src={dozyScreenshot}
                  alt="Dozy App Screenshot"
                  className="w-full h-auto rounded-3xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Why Commuters Trust Dozy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the intelligent features that make Dozy the ultimate travel companion for stress-free commuting.
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
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
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