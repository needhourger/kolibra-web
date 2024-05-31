import request from "./request"

export const getBooks = () => {
  return request.get('books')
}
export const getBookByID = (bid) => {
  const url = `/books/${bid}`
  return request.get(url)
}