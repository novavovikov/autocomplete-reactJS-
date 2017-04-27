export function selectItem(id) {
  return {
    type: 'SELECT_ITEM',
    payload: id
  }
}