class LinkedListNode {
  constructor() {
    this.next = null;
    this.previous = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(node) {
    if (!(node instanceof LinkedListNode)) {
      throw new TypeError("node needs to be instance of LinkedListNode");
    }

    let current = null;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
      node.previous = current;
    }

    this.size++;
  }

  each(fn) {
    let current = this.head;

    while (current) {
      fn(current);
      current = current.next;
    }
  }
}

module.exports.LinkedListNode = LinkedListNode;
module.exports.LinkedList = LinkedList;
