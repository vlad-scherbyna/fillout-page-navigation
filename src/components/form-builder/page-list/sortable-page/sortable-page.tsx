import { useSortable } from '@dnd-kit/sortable';
import { cva, type VariantProps } from 'class-variance-authority';
import { Page } from "@/types/page";
import { cn } from '@/utils/markup';
import { Styles } from "@/types/core";
import { CSS } from "@dnd-kit/utilities";
import { ActionMenu } from "src/components/action-menu";

const sortablePageVariants = cva(
  'relative flex items-center justify-between h-8 text-sm font-medium rounded-lg transition-colors ease-in-out duration-300',
  {
    variants: {
      variant: {
        default: 'bg-gray-700/15 text-gray-600 hover:bg-gray-700/35',
        active: 'color-dark bg-white border-[0.5px] border-gray-300 shadow-light',
      },

    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconsVariants = cva(
  'text-gray-500',
  {
    variants: {
      variant: {
        default: '',
        active: 'text-yellow',
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

export const SortablePage = ({ page, isActive, onSelect, variant, className }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.7 : undefined,
    zIndex: isDragging ? 50 : 1,
    transition
  };

  const Icon = page?.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        sortablePageVariants({ variant }),
        className
      )}
      onClick={onSelect}
      {...attributes}
      {...listeners}
    >
      <div className="relative flex gap-2 items-center justify-between w-full px-2.5 py-1">
        <Icon className={iconsVariants({ variant })} />
        <div>{page.title}</div>

        {isActive && (
          <div className="relative">
            <ActionMenu />
          </div>
        )}
      </div>
    </div>
  );
}