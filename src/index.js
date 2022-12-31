import { a } from './a.js'
const b = import('./b.js') // 动态引入，也按需加载
const hi = () => {
  console.log('hi')
  console.log(a);
  console.log(b)
}

hi()