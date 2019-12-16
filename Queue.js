class QueueNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class Queue {
  constructor() {
    this.in = null
    this.out = null
  }

  add (value) {
    const newNode = new QueueNode(value)
    if (this.in) {
      newNode.next = this.in
      this.in.prev = newNode
      this.in = newNode
    } else {
      this.in = newNode
      this.out = newNode
    }
    return this
  }

  
}

class DLLNode {
  constructor(value) {
    this.value = value
    this._next = null
    this._prev = null
  }

  get next() {
    return this._next
  }

  get prev() {
    return this._prev
  }

  setNext(node) {
    this._next = node
  }

  setPrev(node) {
    this._prev = node
  }

  setValue(val) {
    this.value = val
  }
}

class DoubleLinkedList {
  constructor() {
    this.currentNode = null
  }

  add(value) {
    const node = new DLLNode(value)
    if (this.currentNode) {
      node.setPrev(this.currentNode)
      node.setNext(this.currentNode.next)
      this.currentNode.setNext(node)
      this.currentNode = node
    } else {
      this.currentNode = node
    }
    return this
  }

  next () {
    if (this.currentNode.next) {
      this.currentNode = this.currentNode.next
    }
    return this
  }

  prev () {
    if (this.currentNode.prev) {
      this.currentNode = this.currentNode.prev
    }
    return this
  }

  remove () {
    if (this.currentNode) {
      if (this.currentNode.prev) {

      }
    }
  }
  
}

const list = new DoubleLinkedList()

list.add(5)
console.log(list)
list.add(2).add(54).prev().prev()
console.log(list)