import { motion } from 'motion/react';
import type { ComponentType, SVGProps } from 'react';

export type SocialBrand = 'instagram' | 'tiktok' | 'youtube' | 'discord' | 'linkedin' | 'twitter' | 'github';

export type SocialButtonSize = 'sm' | 'lg';

export interface SocialButtonProps {
  brand: SocialBrand;
  icon: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  href: string;
  label: string;
  size?: SocialButtonSize;
  onClick?: () => void;
  showLabel?: boolean;
}

// Official-ish brand gradients. Instagram's is the approved multi-stop mark;
// TikTok leans on its dual-accent treatment; others use their core brand color.
const BRAND_STYLES: Record<SocialBrand, { background: string }> = {
  instagram: {
    background: 'linear-gradient(45deg, #F58529 0%, #DD2A7B 45%, #8134AF 75%, #515BD4 100%)',
  },
  tiktok: {
    background:
      'linear-gradient(135deg, #25F4EE 0%, #000000 35%, #000000 65%, #FE2C55 100%)',
  },
  youtube: { background: '#FF0000' },
  discord: { background: 'linear-gradient(135deg, #7289DA 0%, #5865F2 100%)' },
  linkedin: { background: '#0A66C2' },
  twitter: { background: '#000000' },
  github: { background: 'linear-gradient(135deg, #333333 0%, #1F1F1F 100%)' },
};

export function SocialButton({
  brand,
  icon: Icon,
  href,
  label,
  size = 'sm',
  onClick,
  showLabel = false,
}: SocialButtonProps) {
  const sizeClasses =
    size === 'sm'
      ? 'w-10 h-10 rounded-xl'
      : 'px-5 py-3 rounded-2xl gap-2 min-h-[44px]';

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className={`inline-flex items-center justify-center text-white shadow-md hover:shadow-lg transition-shadow duration-200 ${sizeClasses}`}
      style={BRAND_STYLES[brand]}
    >
      <Icon className={iconSize} aria-hidden />
      {showLabel && <span className="text-sm font-medium">{label}</span>}
    </motion.a>
  );
}
