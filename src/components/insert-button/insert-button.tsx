import PlusIcon from '@/assets/icons/plus.svg?react';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

// animations
const ANIMATION_INITIAL = {opacity: 0, scale: 0.8, y: "-50%", x: "-50%"};
const ANIMATION_ACTIVE = {opacity: 1, scale: 1, y: "-50%", x: "-50%"};
const ANIMATION_EXIT = {opacity: 0, scale: 0.8, y: "-50%", x: "-50%"};
const ANIMATION_TRANSITION = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  duration: 0.2
};

interface Props {
  idx: number
  onClick(): void;
  hoverInsertIndex: number | null;
  handleHover(idx: number | null): void;
}

const InsertButtonComponent = ({ idx, hoverInsertIndex, handleHover, onClick }: Props) => {
  const isVisible = hoverInsertIndex === idx + 1;
  
  return (
    <div
      className="absolute right-0 top-0 bottom-0 h-full w-5 cursor-pointer z-20"
      style={{transform: 'translateX(100%)'}}
      onMouseEnter={() => handleHover(idx + 1)}
      onMouseLeave={() => handleHover(null)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute top-1/2 left-1/2"
            initial={ANIMATION_INITIAL}
            animate={ANIMATION_ACTIVE}
            exit={ANIMATION_EXIT}
            transition={ANIMATION_TRANSITION}
          >
            <button
              onClick={onClick}
              className="flex items-center justify-center size-4 border-[0.5px] border-gray-300 bg-white rounded-full transition"
            >
              <PlusIcon className="size-2" color="dark"/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const InsertButton = memo(InsertButtonComponent);
