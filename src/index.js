import parse from "./parse";

// 在浏览器显示时 会有多余的\n
let templateString = `<div>
  <h3> h3 标题</h3>
  <ul>
    <li>A hello</li>
    <li>B goodbye</li>
    <li>C again</li>
  </ul>
</div>`

let ast = parse(templateString);
console.log(`ast:`)
console.log(ast)