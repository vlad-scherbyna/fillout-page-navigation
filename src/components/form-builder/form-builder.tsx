import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { reorder } from "@/utils/reorder";
import { PageList } from "src/components/form-builder/page-list";
import { Page } from "@/types/page";

export const FormBuilder = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: nanoid(), title: 'Info' },
    { id: nanoid(), title: 'Details' },
    { id: nanoid(), title: 'Other' },
    { id: nanoid(), title: 'Ending' },
  ]);
  const [activeId, setActiveId] = useState(pages[0].id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPages(prev => reorder(prev, active.id as string, over.id as string));
    }
  }

  function handleInsertAt(idx: number) {
    const newPage: Page = { id: nanoid(), title: 'New Page' };
    setPages(prev => [
      ...prev.slice(0, idx + 1),
      newPage,
      ...prev.slice(idx + 1),
    ]);
  }

  return (
    <div className="flex items-center gap-2">
      <DndContext onDragEnd={handleDragEnd}>
        <PageList
          pages={pages}
          activeId={activeId}
          onSelect={setActiveId}
          onInsertAt={handleInsertAt}
        />
      </DndContext>
    </div>
  );
}
