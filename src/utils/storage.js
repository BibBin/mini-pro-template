import {appConfig} from '../config'
/*!
 * 本地存储
 */
export default {
    /**
     * 写入Storage
     * @param {String} key 值名称
     * @param {String} value 值
     * @return {void}
     */
    set(key, value) {
        uni.setStorageSync(`${appConfig.name}-${key}`, value);
    },
    /**
     * 获取Storage
     * @param {String} key 值名称
     * @return {String}
     */
    get(key) {
        return uni.getStorageSync(`${appConfig.name}-${key}`);
    },
    /**
     * 删除Storage
     * @param {String} key 值名称
     * @return {void}
     */
    remove(key) {       
        uni.removeStorageSync(`${appConfig.name}-${key}`);
    }
};