export function findText(text) {
  return {
    type: 'FIND_TEXT',
    payload: text
  }
}