import { DndContext, type DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { reorder } from "@/utils/reorder";
import { PageList } from "src/components/form-builder/page-list";
import { Page } from "@/types/page";
import { pagesMock } from "@/mocks/pages";
import DocumentIcon from '@/assets/icons/document.svg?react';

export const FormBuilder = () => {
  const [pages, setPages] = useState<Page[]>(pagesMock);
  const [activeId, setActiveId] = useState<string>(pages[0].id);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPages(prev => reorder(prev, active.id.toString(), over.id.toString()));
    }
  }

  const handleInsertAt = (idx: number) => {
    const newPage: Page = { id: nanoid(), title: 'New Page', icon: DocumentIcon };
    setPages(prev => [
      ...prev.slice(0, idx),
      newPage,
      ...prev.slice(idx),
    ]);
  }

  return (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis, restrictToFirstScrollableAncestor]}>
        <PageList
          pages={pages}
          activeId={activeId}
          onSelect={setActiveId}
          onInsertAt={handleInsertAt}
        />
      </DndContext>
  );
}
