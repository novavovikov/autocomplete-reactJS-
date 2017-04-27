export function findItemsHandle(items, text) {
  return items.filter((item) => item.City.toLowerCase().includes(text.toLowerCase()));
}