import jsCodeString from '../../src/service/jsCodeString'
import * as chai from 'chai'
let assert = chai.assert

describe('测试检测文本', ()=>{

    it('测试检测中文', ()=>{
        assert.equal(jsCodeString.checkHasLanguage('中文'), true)
    })

    it('从js代码中提取字符串', ()=>{
        let result = jsCodeString.extractStringFromJS(`var str = "嘻嘻嘻"`)
        assert.equal(result.result, 'var str = ' + result.markString[0] + '0' + result.markString[1])
        assert.deepEqual(result.extractString, ['嘻嘻嘻'])
        
        result = jsCodeString.extractStringFromJS(`var str = "嘻\\"嘻嘻"
var str = '鼎折\\'覆餗'`)
        assert.equal(result.result, 'var str = ' + result.markString[0] + '0' + result.markString[1] 
            + '\nvar str = ' + result.markString[0] + '1' + result.markString[1])
        assert.deepEqual(result.extractString, ['嘻"嘻嘻', '鼎折\'覆餗'])
    })

    it('从js代码中提取模板字符串', ()=>{
        let result = jsCodeString.extractStringFromJS(`var str = \`嘻嘻\n嘻\``)
        assert.equal(result.result, 'var str = ' + result.markString[0] + '0' + result.markString[1])
        assert.deepEqual(result.extractString, ['嘻嘻\n嘻'])
        
        result = jsCodeString.extractStringFromJS(`var str = \`嘻嘻\${}嘻\``)
        assert.equal(result.result, 'var str = ' + result.markString[0] + '0' + result.markString[1])
        assert.deepEqual(result.extractString, ['嘻嘻${}嘻'])
        
        result = jsCodeString.extractStringFromJS(`var str = \`嘻嘻\${1}嘻\``)
        assert.equal(result.result, 'var str = -||0-|||1|||-||-')
        assert.deepEqual(result.extractString, ['嘻嘻{0}嘻'])
        
        result = jsCodeString.extractStringFromJS('var str = `嘻嘻${ `放到${2 + 1}地方` }嘻`')
        assert.equal(result.result, 'var str = -||0-||1-||| 2 + 1 |||-||-||-')
        assert.deepEqual(result.extractString, ['嘻嘻{0}嘻', '放到{0}地方'])
    })
})