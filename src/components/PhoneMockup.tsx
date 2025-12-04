import { motion } from "motion/react";
import { Download } from "lucide-react";

interface PhoneMockupProps {
  appImage: string;
  appLogo: string;
  appName: string;
  variant?: "default" | "floating";
  onDownload?: () => void;
}

export function PhoneMockup({ 
  appImage, 
  appLogo, 
  appName, 
  variant = "default",
  onDownload 
}: PhoneMockupProps) {
  return (
    <motion.div
      className={`relative ${variant === "floating" ? "hover:scale-105" : ""} transition-transform duration-300`}
      whileHover={variant === "floating" ? { y: -10 } : {}}
      onClick={onDownload}
    >
      {/* Phone Frame */}
      <div className="relative mx-auto w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-xl">
        {/* Screen Bezel */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>
          
          {/* App Screenshot */}
          <div className="w-full h-full relative">
            <img 
              src={appImage} 
              alt={`${appName} app screenshot`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with app info */}
            {onDownload && (
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                <div className="text-center text-white">
                  <div className="mb-4">
                    <img 
                      src={appLogo} 
                      alt={`${appName} logo`} 
                      className="w-16 h-16 mx-auto rounded-xl"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{appName}</h3>
                  <div className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                    <Download size={16} />
                    <span className="text-sm">Download</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* App Name Label */}
      <div className="text-center mt-4">
        <h3 className="font-medium text-gray-900">{appName}</h3>
      </div>
    </motion.div>
  );
}