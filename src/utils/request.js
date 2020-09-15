import { appConfig } from '../config'
import storage from './storage'

const send = (
  url,
  data = {},
  method = 'POST',
  showLoading = false,
  base_url = ''
) => {
  if (showLoading) {
    uni.showLoading({
      title: '加载中'
    })
  }
  return new Promise((resolve, reject) => {
    uni.request({
      method: method,
      url: base_url ? base_url + url : process.env.VUE_APP_BASE_API + url,
      data: data,
      header: (() => {
        const tokeValue = storage.get('token')
        let config = {}
        if (tokeValue) {
          config[appConfig.tokenKey] = tokeValue
        }
        return config
      })(),
      success: res => {
        uni.hideLoading()
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            resolve(res.data.data)
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            reject()
          }
        } else {
          reject()
          uni.showToast({
            title: '异常，请稍后重试！',
            icon: 'none'
          })
        }
      },
      fail: () => {
        reject()
        uni.showToast({
          title: '异常，请稍后重试！',
          icon: 'none'
        })
      }
    })
  })
}

export const request = {
  get: (url, data, showLoading, base_url) => {
    return send(url, data, 'GET', showLoading, base_url)
  },
  post: (url, data, showLoading, base_url) => {
    return send(url, data, 'POST', showLoading, base_url)
  }
}
