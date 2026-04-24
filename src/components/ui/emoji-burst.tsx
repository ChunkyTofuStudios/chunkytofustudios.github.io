import { motion, AnimatePresence } from 'motion/react';
import { useCallback, useState } from 'react';

interface Burst {
  id: number;
  x: number;
  y: number;
}

const EMOJIS = ['🎉', '✨', '⭐', '🎮', '💫'];

/**
 * Fires a short burst of emoji particles from an (x, y) point.
 * Use `trigger(clientX, clientY)` from any onClick handler to spawn the effect.
 * Each burst self-cleans after ~900ms.
 */
export function useEmojiBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const trigger = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x, y }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1000);
  }, []);

  const overlay = (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <AnimatePresence>
        {bursts.flatMap((burst) =>
          Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
            const distance = 60 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - 40;
            const emoji = EMOJIS[(i + Math.floor(burst.id)) % EMOJIS.length];
            return (
              <motion.span
                key={`${burst.id}-${i}`}
                className="absolute text-2xl select-none"
                style={{ left: burst.x, top: burst.y }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: dx,
                  y: dy,
                  scale: 1.1,
                  rotate: (Math.random() - 0.5) * 180,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {emoji}
              </motion.span>
            );
          }),
        )}
      </AnimatePresence>
    </div>
  );

  return { trigger, overlay };
}
