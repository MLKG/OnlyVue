<template>
  <div class="text-center">
    <div>javascript风格指南</div>
    <div>javascript风格</div>
    <div>javascript指南</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    mounted () {
      // Types
      // const 是一个不变量，必须首次赋值
      // let是一个局部可变的量，可在任何时候赋值
      const foo = 1
      let bar = foo
      bar = 9
      console.log(foo, bar)

      const fooo = [1, 2]
      const baro = fooo
      fooo[0] = 9
      console.log(fooo[0], baro[0])

      // References
      // 常量使用const, 变量使用let
      {
        let a = 1
        const b = 1
        console.log(a)
        console.log(b)
      }
      // console.log(a)  ReferenceError
      // console.log(b)  ReferenceError

      // Objects
      function getKey (k) {
        return k
      }
      const obj = {
        id: 5,
        name: 'san',
        [getKey('enabled')]: true
      }
      console.log(obj)

      const daLin = 'Dalin Hui'
      const daLinHui = {
        id: 5,
        name: 'san'
      }
      const daObj = {
        daLin,
        daLinHui
      }

      console.log(daObj)

      const has = Object.prototype.hasOwnProperty
      console.log(has.call(daObj, 'daLin')) // true
      console.log(has.call(daObj, 'dalin')) // false
      console.log(has.call(daObj, 'daLinHui')) // true

      // Arrays
      const someStack = []
      someStack.push('a')
      someStack.push('b')
      someStack.push('c')
      console.log(someStack)

      // copy a array's good way
      const someStackCopy = [...someStack]
      console.log(someStack === someStackCopy)  // false
      someStackCopy.push('d')
      console.log(someStackCopy)

      const arrayFoo = document.querySelectorAll('.text-center')
      console.log(arrayFoo)
      const nodes = Array.from(arrayFoo)
      console.log(nodes[0].textContent)

      const arrayDa1 = [1, 2, 3].map((x) => {
        const y = x + 1
        return x * y
      })
      console.log(arrayDa1)

      const arrayDa2 = [1, 2, 3].map(x => x + 1)
      console.log(arrayDa2)
      console.log('end')

      const flat = {}
      const arrayDa3 = [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
        console.log(memo)
        console.log(item)
        console.log(index)
        const flattern = memo.concat(item)
        flat[index] = flattern
        return flattern
      })

      console.log(arrayDa3)
      console.log(flat)

      // Destructing
      function getFullName ({firstName, lastName}) {
        return `${firstName}${lastName}`
      }
      console.log(getFullName({firstName: 'Zeng', lastName: 'Guilin'}))
      const arr = [1, 2, 3, 4]
      const [first, second] = arr
      console.log(first)
      console.log(second)

      function processInput ({left, right, top, bottom}) {
        return {left, right, top, bottom}
      }
      const {left, top} = processInput({left: 100, top: 200})
      console.log(left)
      console.log(top)

      // String
      const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.'
      console.log(errorMessage)
      function sayHi (name) {
        return `How are you, ${name}?`
      }

      console.log(sayHi('Dalin'))

      const foo1 = `'this' is "quoted"`
      console.log(foo1)

      // Functions
      let test
      let currentUser = true
      if (currentUser) {
        test = () => {
          console.log('Yup')
        }
      }
      test()
    }
  }
</script>
