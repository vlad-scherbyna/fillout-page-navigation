import { DndContext, type DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { reorder } from "@/utils/reorder";
import { PageList } from "src/components/form-builder/page-list";
import { Page } from "@/types/page";
import { pagesMock, addPageButton } from "@/mocks/pages";
import DocumentIcon from '@/assets/icons/document.svg?react';

export const FormBuilder = () => {
  const [pages, setPages] = useState<Page[]>(pagesMock);
  const [activeId, setActiveId] = useState<string>(pages[0].id);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id.toString();
    // check if its not add button
    const page = [...pages, addPageButton].find(p => p.id === id);
    if (page?.isSortable === false) return;
    
    setActiveId(id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id.toString();
    const overId = over.id.toString();
    
    // check if its not add button
    const activePage = [...pages, addPageButton].find(p => p.id === activeId);
    const overPage = [...pages, addPageButton].find(p => p.id === overId);
    
    if (activePage?.isSortable === false || overPage?.isSortable === false) return;
    
    if (activeId !== overId) {
      setPages(prev => reorder(prev, activeId, overId));
    }
  }

  // Unified function to add a page at any position
  const handleInsertPage = (idx: number) => {
    const newPageId = nanoid();
    const newPage: Page = { id: newPageId, title: 'New Page', icon: DocumentIcon };
    
    setPages(prev => [
      ...prev.slice(0, idx),
      newPage,
      ...prev.slice(idx),
    ]);
    
    // Set the new page as active
    setActiveId(newPageId);
  }
  
  // add new page at the end
  const handleAddPage = () => {
    handleInsertPage(pages.length);
  };

  return (
    <DndContext 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd} 
      modifiers={[restrictToHorizontalAxis, restrictToFirstScrollableAncestor]}
    >
      <PageList
        pages={[...pages, {...addPageButton, onClick: handleAddPage}]}
        activeId={activeId}
        onSelect={setActiveId}
        onInsertPage={handleInsertPage}
      />
    </DndContext>
  );
}