import PlusIcon from '@/assets/icons/plus.svg?react';

interface Props {
  onClick(): void;
}

export const InsertButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center size-4 border-[0.5px] border-gray-300 bg-white rounded-full transition"
    >
      <PlusIcon className="size-2" />
    </button>
  );
}
