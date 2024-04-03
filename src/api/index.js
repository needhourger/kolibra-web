import request from "./request"

export const getBooks = () => {
  return request.$get('books')
}