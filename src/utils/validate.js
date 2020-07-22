/*!
 * 正则验证
 */
export default {
    // 正则
    empeyReg: /^[ ]*$/g, // 全空格正则
    spaceReg: /\s+/g, // 包含空格正则
    enReg: /^[a-zA-Z]*$/, // 英文正则
    cnReg: /^[\u0391-\uFFE5]+$/, // 中文正则
    numberReg: /^[0-9]+$/, // 数字正则
    enOrNumReg: /^[0-9a-zA-Z]*$/, // 英文数字组合正则
    priceReg: /^[0-9]+([.]{1}[0-9]{1,2})?$/, // 价格正则
    negativePriceReg: /^[0-9]+([.]{1}[0-9]{1,2})?$/, // 支持正负数价格正则
    telReg: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, // 电话正则
    mobileReg: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, // 手机正则
    emailReg: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, // 邮箱正则

    /**
     * 验证表单是否有效
     * @param {string} value 值
     * @param {Array} rules 规则列表
     * @return {boolean}
     */    
    valid(rules = []) {
        // 判断是否有设置表单规则
        if (!rules.length) {
            return {
                status: false,
                message: '未设置表单规则'         
            }            
        }    

        //----------------------------------------------------------
        // 遍历表单规则
        //----------------------------------------------------------
        for (let item of rules) {
            // 判断是否有设置表单验证规则
            if (this.isUndefined(item.rules)) {
                return {
                    status: false,
                    message: '未设置表单验证规则'         
                }            
            }

            //----------------------------------------------------------
            // 遍历表单验证规则
            //----------------------------------------------------------
            for (let itemRules of item.rules) {
                // 如果是NULL、undefined转字符串空
                item.value = item.value === 'null' || item.value === undefined ? '' : item.value;

                // 验证值是否全是空格
                if (item.value.length >= 1 && this.empeyReg.test(item.value) === true) {
                    return {
                        status: false,
                        message: '不能全部为空格'
                    };

                    break;
                }

                // 如果自定义验证函数存在，不验证规则
                if (!this.isUndefined(itemRules.validator)) {
                    const validate = itemRules.validator(itemRules.value, (message) => {
                        if (!this.isUndefined(message)) {
                            return {
                                status: false,
                                message: message
                            }; 
                        } else {
                            return {
                                status: true,
                                message: '验证通过'
                            }; 
                        }
                    });

                    if (!this.isUndefined(validate) && !validate.status) {
                        return {
                            status: validate.status,
                            message: validate.message
                        }
    
                        break;                            
                    }
                } else {
                    // 是否必填
                    if (!this.isUndefined(itemRules.required) && itemRules.required == true && item.value === '') {
                        return {
                            status: false,
                            message: this.isUndefined(itemRules.message) ? '不能为空' : itemRules.message
                        }

                        break;
                    }

                    // 长度最小、最大字符范围
                    if (!this.isUndefined(itemRules.min) && !this.isUndefined(itemRules.max) && item.value < itemRules.min && item.value > itemRules.max) {
                        return {
                            status: false,
                            message: this.isUndefined(itemRules.message) ? `长度${itemRules.min}到${itemRules.max}位` + itemRules.max : itemRules.message
                        }

                        break;
                    } else if (!this.isUndefined(itemRules.min) && item.value.length < itemRules.min) {
                        return {
                            status: false,
                            message: this.isUndefined(itemRules.message) ? '最小长度不能小于' + itemRules.min : itemRules.message
                        }

                        break;
                    } else if (!this.isUndefined(itemRules.max) && item.value.length > itemRules.max) {
                        return {
                            status: false,
                            message: this.isUndefined(itemRules.message) ? '最大长度不能大于' + itemRules.max : itemRules.message
                        }

                        break;
                    }
                    
                    // 验证类型
                    if (!this.isUndefined(itemRules.type) && item.value !== '') {
                        // 是否整型数字
                        if (itemRules.type === 'number') {
                            console.log(item.value);

                            const valid = this.isNumber(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '必须是数字' : itemRules.message
                                }
            
                                break;                            
                            }                       
                        }

                        // 是否价格格式，不支持负数
                        if (itemRules.type === 'price') {
                            const valid = this.isPrice(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '金额格式不对' : itemRules.message
                                }
            
                                break;                            
                            }                       
                        }   

                        // 是否是电话号码
                        if (itemRules.type === 'tel') {
                            const valid = this.isTel(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '电话号码格式不正确' : itemRules.message
                                }
            
                                break;                            
                            }                     
                        }                    

                        // 是否是手机号码
                        if (itemRules.type === 'mobile') {
                            const valid = this.isMobile(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '手机号码格式不正确' : itemRules.message
                                }
            
                                break;                            
                            }                       
                        }                    

                        // 是否是邮箱
                        if (itemRules.type === 'email') {
                            const valid = this.isEmail(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '邮箱格式不正确' : itemRules.message
                                }
            
                                break;                            
                            }                     
                        }
                        
                        // 是否是身份证号码
                        if (itemRules.type === 'IDCard') {
                            const validate = this.isIdentityCard(item.value);

                            if (!validate.status) {
                                return {
                                    status: validate.status,
                                    message: validate.message
                                }
            
                                break;                            
                            }                       
                        }

                        // 值两边是否有空格
                        if (itemRules.type === 'trim') {
                            if (item.value != '' && item.value.slice(0, 1) === ' ' || item.value.slice(-1) === ' ') {
                                return {
                                    status: false,
                                    message: this.isUndefined(itemRules.message) ? '两边不能有空格' : itemRules.message
                                }
            
                                break;                            
                            }                       
                        }
                        
                        // 值里面不能包含空格
                        if (itemRules.type === 'space') {
                            if (this.noSpacesReg.test(item.value)) {
                                return {
                                    status: false,
                                    message: this.isUndefined(itemRules.message) ? '不能包含空格' : itemRules.message
                                }
            
                                break;                             
                            }                                   
                        }
                        
                        // 是否英文字母
                        if (itemRules.type === 'en') {
                            const valid = this.isEN(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '必须是英文字母' : itemRules.message
                                }
            
                                break;                             
                            }                                   
                        }
                        
                        // 是否中文汉字
                        if (itemRules.type === 'cn') {
                            const valid = this.isCN(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '必须是中文汉字' : itemRules.message
                                }
            
                                break;                             
                            }                                   
                        }   

                        // 是否英文数字
                        if (itemRules.type === 'enOrNum') {
                            const valid = this.isENOrNum(item.value);

                            if (!valid) {
                                return {
                                    status: valid,
                                    message: this.isUndefined(itemRules.message) ? '必须是英文数字组合' : itemRules.message
                                }
            
                                break;                             
                            }                               
                        }                         
                    }                  
                }                
            }
        }

        return {
            status: true,
            message: '通过'           
        }
    },
    isUndefined(value) {
        return value === undefined;
    },
    /**
     * 是否整型数字
     * @param {int} value 值
     * @return {boolean}
     */ 	
	isNumber(value) {
		return this.numberReg.test(value);
	},

    /**
     * 是否价格格式，不支持负数
     * @param {string} value 值
     * @return {boolean}
     */	
	isPrice(value) {		
		return this.priceReg.test(value);
	},
    /**
     * 是否是价格格式，支持正负数
     * @param {string} value 值
     * @return {boolean}
     */
    isNegativePrice(value) {
        return negativePriceReg.test(value);
    },
    /**
     * 是否是电话号码
     * @param {string} value 值
     * @return {boolean}
     */
    isTel(value) {
        return this.telReg.test(value);
    },
    /**
     * 是否是手机号码
     * @param {string} value 值
     * @return {boolean}
     */
    isMobile(value) {
        return this.mobileReg.test(value);
    },
    /**
     * 是否是邮箱
     * @param {string} value 值
     * @return {boolean}
     */
    isEmail(value) {
        return this.emailReg.test(value);
    },
    /**
     * 是否英文字母
     * @param {string} value 值
     * @return {boolean}
     */
    isEN(value) {
        return this.enReg.test(value);
    },
    /**
     * 是否中文汉字
     * @param {string} value 值
     * @return {boolean}
     */
    isCN(value) {
        return this.cnReg.test(value);
    },    
    /**
     * 是否英文数字组合
     * @param {string} value 值
     * @return {boolean}
     */
    isENOrNum(value) {
        return this.enOrNumReg.test(value);
    },
    /**
     * 判断是否是身份证
     * @param {string} code
     * @return: {Object}
     */
    isIdentityCard(code) {
        let list = [];
        let result = false;
        let msg = '';

        const city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };

        if (code != '') {
            if (code.length == 18) {
                if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
                    msg = "证件号码格式错误";
                } else if (!city[code.substr(0, 2)]) {
                    msg = "地址编码错误";
                } else {
                    // 18位身份证需要验证最后一位校验位
                    code = code.split('');

                    // 加权因子
                    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

                    // 校验位
                    let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
                    let sum = 0;
                    let ai = 0;
                    let wi = 0;

                    for (let i = 0; i < 17; i++) {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }

                    if (parity[sum % 11] != code[17]) {
                        msg = "证件号码校验错误";
                    } else {
                        result = true;
                    }

                }
            } else {
                msg = "证件号码长度不能少于18位";
            }

        } else {
            msg = "证件号码不能为空";
        }

        return {
            status: result,
            message: msg
        };
    }
};
