import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortablePage } from './sortable-page/sortable-page';
import { InsertButton } from '@/components/insert-button/insert-button';
import { Page } from "@/types/page";
import { useState, useRef, useEffect } from 'react';
import { useDndContext } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { DashedLine } from "@/components/dashed-line";
import { HorizontalScroll } from "@/components/horizontal-scroll";

interface Props {
  pages: Page[];
  addButton: Page;
  activeId: string;
  onSelect(id: string): void;
  onInsertPage(idx: number): void;
}

export const PageList = ({ pages, addButton, activeId, onSelect, onInsertPage }: Props) => {
  const { active: isDragging } = useDndContext();

  const [hoverInsertIndex, setHoverInsertIndex] = useState<number | null>(null);
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
    <div className="relative w-full">
      <HorizontalScroll>
        <div className="relative min-w-max">
          {/* key updates DashedLine length after add delete pages */}
          <DashedLine key={pages.length} />
          <div className="flex gap-5 items-center relative z-10">
            <SortableContext
              items={pages}
              strategy={horizontalListSortingStrategy}
            >
              {pages.map((page, idx) => {
                const isActive = page.id === activeId;

                return (
                  <div key={page.id} className='relative'>
                    <motion.div
                      animate={{
                        marginRight: hoverInsertIndex === idx + 1 ? '1rem' : '0',
                        marginLeft: hoverInsertIndex === idx ? '1rem' : '0'
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <SortablePage
                        page={page}
                        variant={isActive ? 'active' : 'default'}
                        isActive={isActive}
                        onSelect={() => onSelect(page.id)}
                      />
                    </motion.div>
                    {/* insert button between pages */}
                    {idx < pages.length - 1 && !isDragging && (
                      <InsertButton 
                        idx={idx} 
                        hoverInsertIndex={hoverInsertIndex} 
                        handleHover={handleHover} 
                        onClick={() => onInsertPage(idx + 1)}
                      />
                    )}
                  </div>
                );
              })}
            </SortableContext>
            
            {/* Add button - outside of SortableContext */}
            <div className='relative'>
              <SortablePage
                page={addButton}
                variant='addButton'
                isActive={false}
                onSelect={() => addButton.onClick && addButton.onClick()}
              />
            </div>
          </div>
        </div>
      </HorizontalScroll>
    </div>
  );
}