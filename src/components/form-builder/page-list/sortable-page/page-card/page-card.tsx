import { ActionMenu } from './action-menu/action-menu';

interface Props { 
  title: string;
  isActive?: boolean;
}

export const PageCard = ({ title, isActive = false }: Props) => {
  return (
    <div className="relative flex items-center justify-between w-full p-2">
      <h4 className="text-lg text-gray-900">{title}</h4>
      
      {isActive && (
        <div className="ml-4 relative">
          <ActionMenu />
        </div>
      )}
    </div>
  );
}