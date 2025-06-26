interface Props { onClick(): void; }

export const InsertButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 my-1 text-indigo-600 hover:bg-indigo-100 rounded-lg font-semibold transition"
    >
      +
    </button>
  );
}
