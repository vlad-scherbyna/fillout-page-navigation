import { DndContext, type DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { useCallback } from 'react';
import { PageList } from "src/components/form-builder/page-list";
import { useFormBuilder } from '@/context/form-builder-context';

export const FormBuilder = () => {
  const { 
    pages, 
    activeId, 
    addButton, 
    setActiveId, 
    handleInsertPage, 
    handleReorderPages 
  } = useFormBuilder();

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const id = event.active.id.toString();
    setActiveId(id);
  }, [setActiveId]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id.toString();
    const overId = over.id.toString();
    
    handleReorderPages(activeId, overId);
  }, [handleReorderPages]);

  return (
    <DndContext 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToFirstScrollableAncestor]}
    >
      <PageList
        pages={pages}
        addButton={addButton}
        activeId={activeId}
        onSelect={setActiveId}
        onInsertPage={handleInsertPage}
      />
    </DndContext>
  );
}