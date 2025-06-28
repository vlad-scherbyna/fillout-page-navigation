import { ComponentProps, ReactNode, useState } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { EllipsisVertical } from 'lucide-react';

import SetFirstPageIcon from '@/assets/icons/flag.svg?react';
import RenameIcon from '@/assets/icons/pencil-line.svg?react';
import CopyIcon from '@/assets/icons/copy.svg?react';
import DuplicateIcon from '@/assets/icons/duplicate.svg?react';
import DeleteIcon from '@/assets/icons/trash.svg?react';
import { Styles } from "@/types/core";
import { cn } from "@/utils/markup";

interface ActionMenuItemProps extends Styles {
  children: ReactNode;
  onClick(): void;
}

const ActionMenuItem = ({
  children,
  onClick,
  className,
}: ActionMenuItemProps) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <MenuItem
    onPointerDown={e => e.stopPropagation()}
    onClick={onClick}
    className={cn(className, 'flex items-center px-4 py-2 text-sm rounded-md transition')}
  >
    {children}
  </MenuItem>
);

type MTMenuListProps = ComponentProps<typeof MenuList>;
type MTButtonProps = ComponentProps<typeof Button>;

interface ActionMenuProps {
  className?: string;
}

export const ActionMenu = ({ className = '' }: ActionMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="top-start">
      <MenuHandler>
        <Button
          {...({} as MTButtonProps)}
          variant="text"
          className={cn(className, 'p-1 outline-none rounded-md hover:bg-gray-100 transition shadow-none min-w-0')}
          onPointerDown={e => e.stopPropagation()}
          onClick={e => {
            e.stopPropagation();
            setIsMenuOpen(open => !open);
          }}
        >
          <EllipsisVertical className="w-4 h-5 text-gray-600"/>
        </Button>
      </MenuHandler>

      <MenuList
        {...({} as MTMenuListProps)}
        className="bg-white rounded-xl shadow-xl p-2 min-w-[12rem] z-50"
        onPointerDown={e => e.stopPropagation()}
      >
        <div className="px-4 py-2 text-sm font-semibold text-gray-700">
          Settings
        </div>

        <ActionMenuItem onClick={() => {
          closeMenu();
        }}>
          <SetFirstPageIcon className="w-4 h-4 mr-3 text-gray-600"/>
          Set as first page
        </ActionMenuItem>

        <ActionMenuItem onClick={() => {
          closeMenu();
        }}>
          <RenameIcon className="w-4 h-4 mr-3 text-gray-600"/>
          Rename
        </ActionMenuItem>

        <ActionMenuItem onClick={() => {
          closeMenu();
        }}>
          <CopyIcon className="w-4 h-4 mr-3 text-gray-600"/>
          Copy
        </ActionMenuItem>

        <ActionMenuItem onClick={() => {
          closeMenu();
        }}>
          <DuplicateIcon className="w-4 h-4 mr-3 text-gray-600"/>
          Duplicate
        </ActionMenuItem>

        <hr className="my-2 border-t border-gray-200"/>

        <ActionMenuItem
          className="text-red-600 hover:bg-red-100"
          onClick={() => {
            closeMenu();
          }}
        >
          <DeleteIcon className="w-4 h-4 mr-3 text-gray-600"/>
          Delete
        </ActionMenuItem>
      </MenuList>
    </Menu>
  );
};
