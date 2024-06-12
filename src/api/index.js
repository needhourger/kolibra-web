import request from "./request"

export const getBooks = () => {
  return request.get('books')
}
export const getBookByID = (bid) => {
  const url = `/books/${bid}`
  return request.get(url)
}
export const getBookChaptersById = (bid) => {
  const url = `/books/${bid}/chapters`
  return request.get(url)
}
export const getBookChapterById = (params) => {
  const url = `/books/${params.bookId}/chapters/${params.chapterId}`
  return request.get(url)
}
export const getBookChapterContent = (params) => {
  const url = `/books/${params.bookId}/chapters/${params.chapterId}/content`
  return request.get(url)
}
export const requestScanLibrary = () => {
  const url = '/library/scan'
  return request.get(url)
}