import router from "@/router"
import { useLoadingStore } from "@/stores/loadStore"
import axios from "axios"
import { ElMessage } from "element-plus"
import _ from "loadsh"
import QS from "qs"

const instance = axios.create({
  baseURL: "/api",
  timeout: 2 * 60 * 1000,
  headers: {'Content-Type':'application/json'}
})

instance.interceptors.request.use((config) => {
  const loadStore = useLoadingStore()
  loadStore.loading()
  return config
},(error) => {
  const loadStore = useLoadingStore()
  loadStore.stop()
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  const loadStore = useLoadingStore()
  loadStore.stop()
  return response
}, error => {
  const loadStore = useLoadingStore()
  loadStore.stop()
  console.log(error)
  const status = error.response.status
  if (status === 401) {
    router.push({name:"Login", query: { to: btoa(window.location.pathname) }})
  }
  ElMessage.error(_.get(error,"response.data.message",""))
  return Promise.reject(error.response);
})

const request = {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      QS.stringify(params)
      instance.get(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
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
        reject(_.get(err,'response.data'))
      })
    })
  },
  put: (url, params, config) => {
    return new Promise((resolve, reject) => {
      instance.put(url, params, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(_.get(err,"response.data"))
      })
    })
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.delete(url, { ...params }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(_.get(err,'response.data'))
      })
    })
  }
}

export default request