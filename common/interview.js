
/* 单链表翻转 */
const reverseList = (list) => {

  let p = list.head
  let q = null

  while (p.next !== null) {
    q = p.next

    p.next = q.next
    q.next = list.head.next

    list.head.next = q
  }

  return list
}

/* setTimeout 队列*/

const setTimeoutDemo = (arr) => {
  let func = arr || [1, 2, 3]

  for(var i in func) {// var(行数作用域) let(块作用域无变量提升)
    setTimeout(() => {
      console.log(`time 1 ${func[i]}`)
    }, 0)

    setTimeout(() => {
      console.log(`time 2 ${func[i]}`)
    }, 0)

    console.log(i)
  }

}


/* this arguments */

const testThis = function() {
  
}