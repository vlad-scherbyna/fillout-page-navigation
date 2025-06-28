import PlusIcon from '@/assets/icons/plus.svg?react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  idx: number
  onClick(): void;
  hoverInsertIndex: number | null;
  handleHover(idx: number | null): void;
}

export const InsertButton = ({ idx, hoverInsertIndex, handleHover, onClick }: Props) => {
  return (
    <div
      className="absolute right-0 top-0 bottom-0 h-full w-[35px] cursor-pointer z-20"
      style={{transform: 'translateX(100%)'}}
      onMouseEnter={() => handleHover(idx + 1)}
      onMouseLeave={() => handleHover(null)}
    >
      <AnimatePresence>
        {hoverInsertIndex === idx + 1 && (
          <motion.div
            className="absolute top-1/2 left-1/2"
            initial={{opacity: 0, scale: 0.8, y: "-50%", x: "-50%"}}
            animate={{opacity: 1, scale: 1, y: "-50%", x: "-50%"}}
            exit={{opacity: 0, scale: 0.8, y: "-50%", x: "-50%"}}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              duration: 0.2
            }}
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
}