import { Zap, TrendingUp, Target, Gamepad2, Trophy, Clock } from "lucide-react";
import { AppPage } from "./AppPage";
import beehiveLogo from '../../assets/beehive_logo.png';
import beehiveScreenshot from '../../assets/beehive_ss.png';

type AppPageType = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface BeehivePageProps {
  onAppClick?: (app: AppPageType) => void;
}

export function BeehivePage({ onAppClick }: BeehivePageProps) {
  const config = {
    name: "Beehive",
    slug: "beehive",
    logo: beehiveLogo,
    screenshot: beehiveScreenshot,
    category: "Word Game",
    categoryColor: "orange",
    subtitle: "Buzz into the World of Words with Beehive",
    description: "Are you ready to add some buzz to your brain? Beehive is not just a game—it's your daily dose of fun and learning wrapped into one.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.beehive&hl=en_IE",
    appStoreUrl: "https://testflight.apple.com/join/5WeUgnQ1",
    featuresTitle: "Why Players Love Beehive",
    featuresSubtitle: "Discover what makes Beehive the perfect word puzzle companion for players around the world.",
    gradientFrom: "from-yellow-50",
    gradientTo: "to-orange-50",
    accentColor: "orange",
    customColor: "#FBBC04",
    features: [
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
    ]
  };

  return <AppPage config={config} onAppClick={onAppClick} />;
}