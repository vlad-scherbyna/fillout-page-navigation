import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortablePage } from './sortable-page/sortable-page';
import { InsertButton } from '@/components/insert-button/insert-button';
import { Page } from "@/types/page";
import { useState, useRef, useEffect } from 'react';
import { useDndContext } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  pages: Page[];
  activeId: string;
  onSelect(id: string): void;
  onInsertAt(idx: number): void;
}

export const PageList = ({ pages, activeId, onSelect, onInsertAt }: Props) => {
  const [hoverInsertIndex, setHoverInsertIndex] = useState<number | null>(null);
  const { active: isDragging } = useDndContext();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleHover = (idx: number | null) => {
    // clear prev timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // if cursor leaves zone hide button
    if (idx === null) {
      setHoverInsertIndex(null);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      setHoverInsertIndex(idx);
    }, 300);
  };

  // clear timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <SortableContext
      items={pages}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-5 items-center relative">
        {pages.map((page, idx) => {
          const isActive = page.id === activeId;

          return (
            <motion.div
              key={page.id}
              className="relative"
              animate={{
                marginRight: hoverInsertIndex === idx + 1 ? '0.5rem' : '0',
                marginLeft: hoverInsertIndex === idx ? '0.5rem' : '0'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <SortablePage
                page={page}
                variant={isActive ? 'active' : 'default'}
                isActive={isActive}
                onSelect={() => onSelect(page.id)}
              />

              {/* insert button between pages */}
              {idx < pages.length - 1 && !isDragging && (
                <div
                  className="absolute right-0 top-0 bottom-0 h-full w-[35px] cursor-pointer z-10"
                  style={{ transform: 'translateX(100%)' }}
                  onMouseEnter={() => handleHover(idx + 1)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <AnimatePresence>
                    {hoverInsertIndex === idx + 1 && (
                      <motion.div
                        className="absolute top-1/2 left-1/2"
                        initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                          duration: 0.2
                        }}
                      >
                        <InsertButton onClick={() => onInsertAt(idx + 1)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </SortableContext>
  );
}