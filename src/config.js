export const appConfig = {
    name: 'thaier',
    tokenKey: 'x-access-token',
    apiUrl: process.env.VUE_APP_ENV === 'dev' ? 'http://localhost:4000/' : ''
}
