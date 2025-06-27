import { useSortable } from '@dnd-kit/sortable';
import { cva, type VariantProps } from 'class-variance-authority';
import { Page } from "@/types/page";
import { PageCard } from "./page-card";
import { cn } from '@/utils/markup';
import { Styles } from "@/types/core";

const sortablePageVariants = cva(
  'relative flex items-center justify-between h-8 text-sm font-medium rounded-lg transition-colors ease-in-out duration-300',
  {
    variants: {
      variant: {
        default: 'bg-gray-700/15 text-gray-600 hover:bg-gray-700/35',
        active: 'color-dark bg-white border-[0.5px] border-gray-300 shadow-light',
      },
      isDragging: {
        true: 'z-50',
      }
    },
    defaultVariants: {
      variant: 'default',
      isDragging: false,
    },
  }
);

interface Props extends Styles, VariantProps<typeof sortablePageVariants> {
  page: Page;
  isActive: boolean;
  onSelect(): void;
}

export const SortablePage = ({ page, isActive, onSelect, variant, className }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useSortable({ id: page.id });

  const translateX = transform?.x ?? 0;
  const translateY = transform?.y ?? 0;
  const style = {
    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        sortablePageVariants({
          variant,
          isDragging 
        }), 
        className
      )}
      onClick={onSelect}
      {...attributes}
      {...listeners}
    >
      <PageCard title={page.title} isActive={isActive} />
    </div>
  );
}