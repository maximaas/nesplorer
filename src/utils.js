export default (downloadURL, fileName) => {
  const a = document.createElement('a')

  a.href     = downloadURL
  a.download = fileName

  document.body.appendChild(a)
  a.click()

  window.URL.revokeObjectURL(downloadURL)
  a.remove()
}
