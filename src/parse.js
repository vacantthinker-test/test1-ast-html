export default function parse(templateString) {
    let index = 0; // 指针
    let tail = templateString; // 剩余部分, 尾巴.
    let stackTag = []; // 标签栈, 遇开始标签就入栈
    let stackContent = [{children: []}]; // 内容栈, 遇结束标签出栈 和 文本内容就入栈
    
    // 替换掉所有的\n, 变为 ""
    templateString = templateString.replaceAll("\n", "");
    
    // 使用正则表达式匹配开始标签, 结束标签, 标签内的文本内容
    let regexTagStart = /^\<([a-z]+[1-6]*)\>/
    
    let regexTagEnd = /^\<\/([a-z]+[1-6]*)\>/
    
    let regexWord = /^([^\<]*)\<\/([a-z]+[1-6]*)\>/
    
    let regexEmpty = /^(\s+$)/
    
    while (index < templateString.length - 1) {
        tail = templateString.substring(index); // 每次循环开始前, 更新剩余部分字符串.
        
        // 正则表达式 测试 字符串, 匹配 返回true
        if (regexTagStart.test(tail)) {
            // console.log(`tail:${tail}`)
            let tagStart = tail.match(regexTagStart)[1];
            // console.log(`tagStart:${tagStart}`)
            stackTag.push(tagStart);
            stackContent.push({
                tag: tagStart, children: []
            });
            index += tagStart.length + 2; // 开始标签本身长度 加上 <> 两个尖角号 长度
        } else if (regexTagEnd.test(tail)) {
            let tagEnd = tail.match(regexTagEnd)[1];
            // console.log(`tagEnd: ${tagEnd}`)
            let tagStart = stackTag[stackTag.length - 1]; // 从标签栈 中 获取 标签
            
            if (tagEnd === tagStart) {
                stackTag.pop();
                let pop = stackContent.pop();
                // console.log(`被弹出的元素是 pop`)
                // console.log(pop)
                
                let topElement = stackContent[stackContent.length - 1]; // 获取栈顶元素
                // console.log('栈顶元素 是 topElement')
                // console.log(topElement);
                // 添加被弹出的 h3 至 div 中
                topElement.children.push(pop);
    
            } else {
                throw new Error("给定的解析字符串没有对齐")
            }
            
            
            index += tagEnd.length + 3;
            
        } else if (regexWord.test(tail)) {
            let word = tail.match(regexWord)[1]
            
            let topElement = stackContent[stackContent.length-1];
            // 这里可能碰到全是空字符串的情况, word 全是 空字符串
            // 使用正则表达式匹配一下,
            if (!regexEmpty.test(word)) {
                // console.log('topElement')
                // console.log(topElement)
                // console.log(`word${word}`); // 把 h3 标题 填入 内容栈[stackContent] 的 children 属性 中

                topElement.children.push({
                    value: word, type: 3
                })
            }
            
            index += word.length;
        } else {
            
            index++;
        }
    }
    // console.log(stackContent)
    
    
    return stackContent[0].children[0]
}


















