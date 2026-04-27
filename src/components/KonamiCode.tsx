import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Classic: ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const RAIN_EMOJIS = ['🎮', '🕹️', '🎉', '⭐', '💫', '🏆', '👾'];

/**
 * Listens for the Konami code anywhere on the page. When triggered,
 * runs a brief (~5s) celebration: hue-rotate wash on the page and
 * a shower of game-studio emojis.
 */
export function KonamiCode() {
  const [partyMode, setPartyMode] = useState(false);
  const [rain, setRain] = useState<Array<{ id: number; left: number; emoji: string; duration: number; delay: number }>>([]);

  useEffect(() => {
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[index]) {
        index += 1;
        if (index === SEQUENCE.length) {
          index = 0;
          triggerParty();
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const triggerParty = () => {
    if (partyMode) return;
    setPartyMode(true);
    setRain(
      Array.from({ length: 36 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        emoji: RAIN_EMOJIS[Math.floor(Math.random() * RAIN_EMOJIS.length)],
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 1.5,
      })),
    );
    window.setTimeout(() => {
      setPartyMode(false);
      setRain([]);
    }, 5000);
  };

  return (
    <>
      <AnimatePresence>
        {partyMode && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[9998] mix-blend-hue"
            style={{
              background:
                'linear-gradient(135deg, #ff006e 0%, #ffbe0b 25%, #8338ec 50%, #3a86ff 75%, #06d6a0 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0.45, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, times: [0, 0.1, 0.85, 1] }}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden>
        <AnimatePresence>
          {rain.map((drop) => (
            <motion.span
              key={drop.id}
              className="absolute text-3xl select-none"
              style={{ left: `${drop.left}%`, top: -40 }}
              initial={{ y: -40, opacity: 0, rotate: 0 }}
              animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: drop.duration,
                delay: drop.delay,
                ease: 'linear',
              }}
            >
              {drop.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
