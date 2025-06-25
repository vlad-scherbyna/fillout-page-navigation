import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { EllipsisIcon } from 'lucide-react';

export const ActionMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-gray-100 transition">
          <EllipsisIcon className="w-5 h-5 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-2 rounded-lg shadow-lg flex flex-row space-x-2">
        <DropdownMenuItem className="px-3 py-1 hover:bg-gray-100 rounded-md">Rename</DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-1 hover:bg-gray-100 rounded-md">Duplicate</DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-1 hover:bg-gray-100 rounded-md">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
