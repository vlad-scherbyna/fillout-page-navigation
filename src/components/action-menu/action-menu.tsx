import { ComponentProps, FunctionComponent, ReactNode, SVGProps, useState } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { EllipsisVertical } from 'lucide-react';
import SetFirstPageIcon  from '@/assets/icons/flag.svg?react';
import RenameIcon        from '@/assets/icons/pencil-line.svg?react';
import CopyIcon          from '@/assets/icons/copy.svg?react';
import DuplicateIcon     from '@/assets/icons/duplicate.svg?react';
import DeleteIcon        from '@/assets/icons/trash.svg?react';
import { Styles }        from "@/types/core";
import { cn }            from "@/utils/markup";

interface ActionMenuItemProps extends Styles {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconColor?: string;
  children: ReactNode;
  onClick(): void;
}

const ActionMenuItem = ({
  icon: Icon,
  iconColor = "text-gray-700",
  children,
  onClick,
  className,
}: ActionMenuItemProps) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <MenuItem
    onPointerDown={e => e.stopPropagation()}
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 p-0 text-sm font-medium rounded-md transition outline-none",
      className
    )}
  >
    <Icon className={cn("w-4 h-4", iconColor)} />
    {children}
  </MenuItem>
);

type MTMenuListProps = ComponentProps<typeof MenuList>;
type MTButtonProps   = ComponentProps<typeof Button>;

export const ActionMenu = ({ className = "" }: { className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={8} placement="top">
      <MenuHandler>
        <Button
          {...({} as MTButtonProps)}
          variant="text"
          className={cn(
            "p-1 outline-none rounded-md hover:bg-gray-100 transition shadow-none min-w-0",
            className
          )}
          onPointerDown={e => e.stopPropagation()}
          onClick={e => {
            e.stopPropagation();
            setIsMenuOpen(o => !o);
          }}
        >
          <EllipsisVertical className="w-4 h-5 text-gray-600" />
        </Button>
      </MenuHandler>

      <MenuList
        {...({} as MTMenuListProps)}
        className="bg-white rounded-xl shadow-light min-w-[215px] z-50"
      >
        <div className="p-3 bg-gray-200 rounded-t-xl border-b-[0.5px] border-gray-300 text-base font-semibold text-dark outline-0">
          Settings
        </div>

        <div className="flex flex-col p-3 gap-3 outline-0">
          <ActionMenuItem
            icon={SetFirstPageIcon}
            iconColor="text-blue"
            onClick={closeMenu}
          >
            Set as first page
          </ActionMenuItem>

          <ActionMenuItem
            icon={RenameIcon}
            onClick={closeMenu}
          >
            Rename
          </ActionMenuItem>

          <ActionMenuItem
            icon={CopyIcon}
            onClick={closeMenu}
          >
            Copy
          </ActionMenuItem>

          <ActionMenuItem
            icon={DuplicateIcon}
            onClick={closeMenu}
          >
            Duplicate
          </ActionMenuItem>

          <hr className="border-t-[0.5px] border-gray-300" />

          <ActionMenuItem
            icon={DeleteIcon}
            iconColor="text-red"
            className="hover:bg-red-100"
            onClick={closeMenu}
          >
            Delete
          </ActionMenuItem>
        </div>
      </MenuList>
    </Menu>
  );
};
