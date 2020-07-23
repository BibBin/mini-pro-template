export const appConfig = {
  name: 'thaier',
  tokenKey: 'x-access-token',
  apiUrl: process.env.VUE_APP_PLATFORM === 'h5' ? '/api' : process.env.VUE_APP_BASE_API
}
