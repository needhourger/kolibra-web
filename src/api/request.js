import axios from "axios"
import { ElMessage } from "element-plus"
import _ from "loadsh"
import QS from "qs"

const instance = axios.create({
  baseURL: "/api",
  timeout: 2 * 60 * 1000,
  headers: {'Content-Type':'application/json'}
})

const request = {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      QS.stringify(params)
      instance.get(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        ElMessage.error(_.get(err,"response.data.error"))
        reject(_.get(err,'response.data'))
      })
    })
  },
  post: (url, params, config) => {
    return new Promise((resolve,reject) => {
      QS.stringify(params)
      instance.post(url, params, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        ElMessage.error(_.get(err, "response.data.error"))
        reject(_.get(err,'response.data'))
      })
    })
  },
  put: (url, params, config) => {
    return new Promise((resolve, reject) => {
      instance.put(url, params, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        ElMessage.error(_.get(err,"response.data.error"))
        reject(_.get(err,"response.data"))
      })
    })
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.delete(url, { ...params }).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        ElMessage.error(_.get(err,'response.data.error'))
        reject(_.get(err,'response.data'))
      })
    })
  }
}

export default request