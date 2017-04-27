export function setMessage(message) {
  return {
    type: 'SHOW_MESSAGE',
    payload: message
  }
}