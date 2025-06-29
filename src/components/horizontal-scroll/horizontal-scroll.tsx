import { ReactNode, useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useDndContext } from '@dnd-kit/core';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export const HorizontalScroll = ({ children, className = '' }: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const { active: isDragging } = useDndContext();

  // scroll by offset
  const scrollByOffset = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // update scroll availability
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const update = () => {
      // Check if there's real overflow (content wider than container)
      const hasRealOverflow = el.scrollWidth > el.clientWidth;
      setHasOverflow(hasRealOverflow);
      
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };
    
    // Run update after full rendering
    const timeoutId = setTimeout(update, 100);
    
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    
    // Create ResizeObserver to track content size changes
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    
    return () => {
      clearTimeout(timeoutId);
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex p-1 overflow-x-scroll no-scrollbar scroll-smooth space-x-5"
      >
        {children}
      </div>

      {/* Show buttons only if there's overflow and no active dragging */}
      {hasOverflow && !isDragging && (canScrollLeft || canScrollRight) && (
        <div className="absolute right-[-90px] top-1/2 transform -translate-y-1/2 flex space-x-2 z-20">
          <button
            onClick={() => scrollByOffset(-150)}
            disabled={!canScrollLeft}
            className={`p-2 bg-white rounded-full shadow hover:bg-gray-100 transition ${!canScrollLeft ? 'opacity-50 cursor-default' : ''}`}
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scrollByOffset(150)}
            disabled={!canScrollRight}
            className={`p-2 bg-white rounded-full shadow hover:bg-gray-100 transition ${!canScrollRight ? 'opacity-50 cursor-default' : ''}`}
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};