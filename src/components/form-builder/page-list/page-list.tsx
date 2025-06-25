import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Fragment } from 'react';
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
      strategy={verticalListSortingStrategy}
    >
      {pages.map((page, idx) => (
        <div key={page.id}>
          <SortablePage
            page={page}
            isActive={page.id === activeId}
            onSelect={() => onSelect(page.id)}
          />
          {/*<InsertButton onClick={() => onInsertAt(idx)} />*/}
        </div>
      ))}
    </SortableContext>
  );
}
