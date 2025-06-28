import { ReactNode, useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export const HorizontalScroll = ({ children, className = '' }: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [children]);

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar scroll-smooth space-x-5"
      >
        {children}
      </div>

      {/* Two arrows on the right, offset by -90px */}
      {(canScrollLeft || canScrollRight) && (
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
