/** 可靠性验证: 输入/输出
 * 
 * accept: 统一格式化并校验入口参数
 * 
 *  =>@{accept}: 接受字段
 *  =>@{as}: 字段别名
 *  =>@{required}: false: 非必须 true: 必须
 *  =>@{type}: 字段类型 枚举: Number String Array Object Date Null
 *  =>@{desc}: 字段描述
 *  =>@{fn}: 函数判断
 * 
 * Entity: 格式化输出
 *  => 同accept
 */

const validator = require('validator')

const Helpers = require('../../common/helper')
const { Code, CodeMsg } = require('../../config')

class Protocol {
  
  accept(ctx, accepts) {
    const params = Helpers.mergeParams(ctx)
    const acceptParams = {}

    for(const item of accepts) {

      if(item.required && !Reflect.has(params, item.accept)) {
        return { message: CodeMsg[10001] + `${JSON.stringify(item)}`, code: Code.PARAMS_ERROR }
      }

      if(!item.required && !Reflect.has(params, item.accept)){
        continue
      }

      if(item.fn && !item.fn(params[item.accept])) {
        return { message: CodeMsg[10001] + `${JSON.stringify(item)}`, code: Code.PARAMS_ERROR }
      }
      
      try {
        switch (item.type) {
          case 'Number':
            acceptParams[item.as ? item.as : item.accept] = Number(params[item.accept])
            break
          case 'String':
            acceptParams[item.as ? item.as : item.accept] = String(params[item.accept])
            break
          case 'Boolean':
            acceptParams[item.as ? item.as : item.accept] = Boolean(params[item.accept])
            break
          case 'Date':
            acceptParams[item.as ? item.as : item.accept] = new Date(params[item.accept])
            break
          case 'Object':
            acceptParams[item.as ? item.as : item.accept] = JSON.parse(params[item.accept])
            break
          case 'Array':
            acceptParams[item.as ? item.as : item.accept] = JSON.parse(params[item.accept])
            break
          default:
            return { message: CodeMsg[10001] + `${JSON.stringify(item)}`, code: Code.PARAMS_ERROR }
        }
      } catch(err) {
        console.log(`################### API PARAMS ERROR: ###################\n`, err)
        return { message: `${CodeMsg[10001]}: NEED: ${JSON.stringify(item)} BUT GIVEN: ${params[item.accept]}`, code: Code.PARAMS_ERROR }
      }
    }

    ctx.acceptParams = acceptParams
  }

  entity(data, choosedApi, entitys) {
    accepts[choosedApi].forEach((item) => {})
    return data
  }

}

module.exports = new Protocol()