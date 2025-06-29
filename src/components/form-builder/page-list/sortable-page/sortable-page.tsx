import { useSortable } from '@dnd-kit/sortable';
import { cva, type VariantProps } from 'class-variance-authority';
import { Page } from "@/types/page";
import { cn } from '@/utils/markup';
import { Styles } from "@/types/core";
import { CSS } from "@dnd-kit/utilities";
import { ActionMenu } from "src/components/action-menu";
import { memo } from 'react';

const sortablePageVariants = cva(
  'relative flex gap-2 items-center justify-between h-8 text-sm font-medium rounded-lg w-full px-2.5 py-1 rounded-lg transition ease-in-out duration-300 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-gray-550 text-gray-600 hover:bg-gray-650',
        active: 'color-dark bg-white border-[0.5px] border-gray-300 shadow-light hover:shadow-light-blue hover:border-blue',
        addButton: 'color-dark bg-white border-[0.5px] border-gray-300 shadow-light hover:shadow-light-blue hover:border-blue',
      },

    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconsVariants = cva(
  'transition ease-in-out duration-300',
  {
    variants: {
      variant: {
        default: 'size-5 text-gray-500',
        active: 'text-yellow size-5',
        addButton: 'size-4 text-dark',
      },

    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface Props extends Styles, VariantProps<typeof sortablePageVariants> {
  page: Page;
  isActive: boolean;
  onSelect(): void;
}

const SortablePageComponent = ({ page, isActive, onSelect, variant, className }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: page.id,
    disabled: page.isSortable === false
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 50 : 1,
    transition
  };

  const Icon = page?.icon;
  const handleClick = () => {
    if (page.onClick) {
      page.onClick();
    } else {
      onSelect();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      {...(page.isSortable === false ? {} : attributes)}
      {...(page.isSortable === false ? {} : listeners)}
    >
      <div className={cn(sortablePageVariants({ variant }), className)} >
        <Icon className={iconsVariants({ variant })} />
        <div>{page.title}</div>

        {isActive && page.isSortable !== false && (<ActionMenu />)}
      </div>
    </div>
  );
};

export const SortablePage = memo(SortablePageComponent);