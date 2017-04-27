export function setNotice(notice) {
  return {
    type: 'SHOW_NOTICE',
    payload: notice
  }
}