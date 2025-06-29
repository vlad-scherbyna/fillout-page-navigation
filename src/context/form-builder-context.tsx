import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Page } from '@/types/page';
import { pagesMock, addPageButton } from '@/mocks/pages';
import { reorder } from '@/utils/reorder';
import { nanoid } from "nanoid";
import DocumentIcon from '@/assets/icons/document.svg?react';

interface FormBuilderContextType {
  pages: Page[];
  activeId: string;
  addButton: Page;
  setActiveId: (id: string) => void;
  handleInsertPage: (idx: number) => void;
  handleAddPage: () => void;
  handleReorderPages: (activeId: string, overId: string) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

interface FormBuilderProviderProps {
  children: ReactNode;
}

export const FormBuilderProvider = ({ children }: FormBuilderProviderProps) => {
  const [pages, setPages] = useState<Page[]>(pagesMock);
  const [activeId, setActiveId] = useState<string>(pages[0]?.id || '');

  // Add a new page
  const handleInsertPage = useCallback((idx: number) => {
    const newPage = {
      id: nanoid(),
      title: 'New Page',
      icon: DocumentIcon
    };
    
    setPages(prev => [
      ...prev.slice(0, idx),
      newPage,
      ...prev.slice(idx),
    ]);
    
    setActiveId(newPage.id);
  }, []);

  // add page at the end
  const handleAddPage = useCallback(() => {
    handleInsertPage(pages.length);
  }, [pages.length, handleInsertPage]);

  // reorder pages by drag
  const handleReorderPages = useCallback((activeId: string, overId: string) => {
    if (activeId !== overId) {
      setPages(prev => reorder(prev, activeId, overId));
    }
  }, []);

  const addButtonWithHandler = {
    ...addPageButton,
    onClick: handleAddPage
  };

  const value = {
    pages,
    activeId,
    addButton: addButtonWithHandler, // add button at the end
    setActiveId,
    handleInsertPage,
    handleAddPage,
    handleReorderPages
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormBuilder = (): FormBuilderContextType => {
  const context = useContext(FormBuilderContext);
  
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  
  return context;
}
