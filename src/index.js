import { a } from './a.js'
import { JsxDemo } from './jsx-demo.jsx'
import { x } from './ts-demo.ts'
const b = import('./b.js') // 动态引入，也按需加载
console.log(x)
console.log(JsxDemo)
const hi = () => {
  console.log('hi')
  console.log(a)
  console.log(b)
}

hi()
