export function shareLink(
  id: string,
  key: string,
  target: string,
  keys?: string[]
) {
  const el = document.createElement('textarea')
  el.value = `${
    import.meta.env.VITE_CLIENT_URL
  }/shared/${id}?code=${key}&target=${target}`
  if (keys) el.value += `&keys=${keys}`
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
