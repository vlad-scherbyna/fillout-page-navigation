import { useSortable } from '@dnd-kit/sortable';
import { Page } from "@/types/page";
import { PageCard } from "./page-card";

interface Props {
  page: Page;
  isActive: boolean;
  onSelect(): void;
}

export const SortablePage = ({ page, isActive, onSelect }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: page.id });
  const translateX = transform?.x ?? 0;
  const translateY = transform?.y ?? 0;
  const style = { transform: `translate3d(${translateX}px, ${translateY}px, 0)`, transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between h-8 px-2.5 py-1 bg-gray-700/15 rounded-xl relative
        ${isActive ? 'ring-2 ring-blue' : ''}`}
      onClick={onSelect}
      {...attributes}
      {...listeners}
    >
      <PageCard title={page.title} isActive={isActive} />
    </div>
  );
}