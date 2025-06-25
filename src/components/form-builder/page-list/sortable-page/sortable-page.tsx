import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Page } from "@/types/page";
import { PageCard } from "@/components/form-builder/page-list/sortable-page/page-card";

interface Props {
  page: Page;
  isActive: boolean;
  onSelect(): void;
}

export const SortablePage = ({ page, isActive, onSelect }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: page.id });
  const style = { transform: CSS.Transform.toString(transform) };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between p-4 mb-2 bg-white rounded-xl shadow-sm 
        ${isActive ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'}`}
      onClick={onSelect}
    >
      <PageCard title={page.title} />
    </div>
  );
}
