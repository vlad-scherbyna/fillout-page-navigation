import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export const ActionMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 outline-0 rounded-md hover:bg-gray-100 transition">
          <EllipsisVertical className="w-4 h-4 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white p-2 rounded-lg shadow-lg flex flex-col space-y-1 z-[100]"
        sideOffset={5}
        align="start"
        alignOffset={0}
        side="top"
      >
        <DropdownMenuItem className="px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-1 hover:bg-red-100 text-red-600 rounded-md cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}