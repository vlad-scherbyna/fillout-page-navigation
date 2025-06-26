import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortablePage } from './sortable-page/sortable-page';
import { InsertButton } from './insert-button/insert-button';
import { Page } from "@/types/page";
import { useState } from 'react';
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

  return (
    <SortableContext
      items={pages.map(p => p.id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-5 items-center relative">
        {pages.map((page, idx) => (
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
              isActive={page.id === activeId}
              onSelect={() => onSelect(page.id)}
            />

            {/* insert button between pages */}
            {idx < pages.length - 1 && !isDragging && (
              <div
                className="absolute right-0 top-0 bottom-0 h-full w-8 cursor-pointer z-10"
                style={{ transform: 'translateX(100%)' }}
                onMouseEnter={() => setHoverInsertIndex(idx + 1)}
                onMouseLeave={() => setHoverInsertIndex(null)}
              >
                <AnimatePresence>
                  {hoverInsertIndex === idx + 1 && (
                    <motion.div
                      className="absolute top-1/2 left-1/2"
                      initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                      animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                      exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <InsertButton onClick={() => onInsertAt(idx + 1)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SortableContext>
  );
}