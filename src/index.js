import { a } from './a.js'
const b = import('./b.js') // 动态引入，也按需加载
import { JsxDemo } from './jsx-demo.jsx'
console.log(JsxDemo)
const hi = () => {
  console.log('hi')
  console.log(a);
  console.log(b)
}

hi()