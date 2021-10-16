# vue2 ast 抽象语法树 手写代码

---

### 解析目标如下:

```html
<div>
  <h3> h3 标题</h3>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>
```

### 使用指针思想和栈思想处理

 - 新建一个指针
 - 新建两个栈
   - 遇到开始标签 ```<div> <h3> <ul>``` 
     - 第一个栈, 入栈
       - ```<div> <h3> <ul>```
     - 第二个栈, 入栈
       - ```{'tag': tag, children: []}```
     - index += tag.length + 2
   
   - 遇到结束标签 ```</div> </h3> </ul>```
     - 第一个栈出栈
     - 第二个栈出栈
     - 处理内容
     - index += tag.length + 3
   
   - 遇到标签内的内容 ```h3 标题 A B C ```
     - 获取内容, 把内容压栈 ```{value: 'word', type: 3}```
     - index += word.length
   
   - 不是上述三种情况
     - index++

---

end
finish.
















