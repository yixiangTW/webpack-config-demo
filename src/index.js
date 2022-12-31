import { a } from './a.js'
import { JsxDemo } from './jsx-demo.jsx'
const b = import('./b.js') // 动态引入，也按需加载

console.log(JsxDemo)
const hi = () => {
  console.log('hi')
  console.log(a)
  console.log(b)
}

hi()
