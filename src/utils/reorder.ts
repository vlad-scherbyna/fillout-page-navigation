export function reorder<T extends { id: string }>(
  list: T[],
  fromId: string,
  toId: string
): T[] {
  const oldIndex = list.findIndex(item => item.id === fromId);
  const newIndex = list.findIndex(item => item.id === toId);
  const clone = [...list];
  const [moved] = clone.splice(oldIndex, 1);
  clone.splice(newIndex, 0, moved);
  return clone;
}
