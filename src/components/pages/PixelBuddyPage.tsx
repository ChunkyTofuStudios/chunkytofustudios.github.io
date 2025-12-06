import { Palette, Zap, Heart, Users, Smartphone, Shield } from "lucide-react";
import { AppPage } from "./AppPage";
import pixelBuddyLogo from '../../assets/pixel_buddy_logo.png';
import pixelBuddyScreenshot from '../../assets/pixel_buddy_ss.png';

type AppPageType = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

interface PixelBuddyPageProps {
  onBack?: () => void;
  onAppClick?: (app: AppPageType) => void;
}

export function PixelBuddyPage({ onBack, onAppClick }: PixelBuddyPageProps) {
  const config = {
    name: "Pixel Buddy",
    slug: "pixel-buddy",
    logo: pixelBuddyLogo,
    screenshot: pixelBuddyScreenshot,
    category: "Art & Design",
    categoryColor: "orange",
    subtitle: "Pixel art - paint by number",
    description: "Discover the joy of digital painting with our intuitive pixel art coloring app. Create beautiful artwork one pixel at a time and express your creativity.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.chunkytofustudios.pixel_buddy",
    appStoreUrl: "https://apps.apple.com/us/app/pixel-buddy-coloring-book/id6451399345?uo=4",
    featuresTitle: "Why Artists Choose Pixel Buddy",
    featuresSubtitle: "Discover the features that make Pixel Buddy the perfect creative companion for artists of all skill levels.",
    gradientFrom: "from-blue-50",
    gradientTo: "to-purple-50",
    accentColor: "orange",
    customColor: "#fe9d00",
    features: [
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
    ]
  };

  return <AppPage config={config} onBack={onBack} onAppClick={onAppClick} />;
}