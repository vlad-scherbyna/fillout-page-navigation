import { ActionMenu } from './action-menu/action-menu';

interface Props { 
  title: string;
  isActive?: boolean;
}

export const PageCard = ({ title, isActive = false }: Props) => {
  return (
    <div className="relative flex gap-2 items-center justify-between w-full px-2.5 py-1">
      <span>{title}</span>
      
      {isActive && (
        <div className="relative">
          <ActionMenu />
        </div>
      )}
    </div>
  );
}