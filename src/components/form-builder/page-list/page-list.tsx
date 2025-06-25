import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { SortablePage } from './sortable-page';
import { InsertButton } from './insert-button';
import { Page } from "@/types/page";

interface Props {
  pages: Page[];
  activeId: string;
  onSelect(id: string): void;
  onInsertAt(idx: number): void;
}

export const PageList = ({ pages, activeId, onSelect, onInsertAt }: Props) => {
  return (
    <SortableContext
      items={pages.map(p => p.id)}
      strategy={horizontalListSortingStrategy}
    >
      {pages.map((page, idx) => (
        <>
          <SortablePage
            key={page.id}
            page={page}
            isActive={page.id === activeId}
            onSelect={() => onSelect(page.id)}
          />
          {/*<InsertButton onClick={() => onInsertAt(idx)} />*/}
        </>
      ))}
    </SortableContext>
  );
}
