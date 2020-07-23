import { appConfig } from '../config'
import storage from './storage'

const send = (url, data = {}, method = 'POST', showLoading = true, base_url = '') => {
  uni.showLoading({
    title: '加载中'
  })
  return new Promise((resolve) => {
    uni.request({
      method: method,
      url: (base_url ? base_url : appConfig.apiUrl) + url,
      data: data,
      header: (() => {
        const tokeValue = storage.get('token')
        let config = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        if (tokeValue) {
          config[appConfig.tokenKey] = tokeValue
        }
        return config
      })(),
      success: (res) => {
        uni.hideLoading()
        resolve(res.data)
      }
    })
  })
}

export const request = {
  get: (url, data) => {
    return send(url, data, 'GET')
  },
  post: (url, data) => {
    return send(url, data, 'POST')
  }
}
