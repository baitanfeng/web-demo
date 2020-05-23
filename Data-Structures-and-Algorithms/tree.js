class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    }

    if (key < node.key) {
      node.left = this.insertNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.insertNode(node.right, key);
    }

    return node;
  }

  inOrderTraverse(cb) {
    this.inOrderTraverseNode(this.root, cb);
  }

  inOrderTraverseNode(node, cb) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, cb);
      cb(node.key);
      this.inOrderTraverseNode(node.right, cb);
    }
  }

  preOrderTraverse(cb) {
    this.preOrderTraverseNode(this.root, cb);
  }

  preOrderTraverseNode(node, cb) {
    if (node != null) {
      cb(node.key);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }

  postOrderTraverse(cb) {
    this.postOrderTraverseNode(this.root, cb);
  }

  postOrderTraverseNode(node, cb) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node == null) {
      return false;
    }

    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    }

    return true;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node == null) {
      return node;
    }

    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
    } else {
      if (node.left == null && node.right == null) {
        node = null;
      } else if (node.left == null) {
        node = node.right;
      } else if (node.right == null) {
        node = node.left;
      } else {
        const aux = this.minNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
      }
    }

    return node;
  }
}

const BalanceFactor = {
  UNBALANCED_RIGHT: -2,
  SLIGHTLY_UNBALANCED_RIGHT: -1,
  BALANCED: 0,
  SLIGHTLY_UNBALANCED_LEFT: 1,
  UNBALANCED_LEFT: 2
};

class AVLTree extends BinarySearchTree {
  constructor() {
    super();
    this.root = null;
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    const leftNodeHeight = this.getNodeHeight(node.left);
    const rightNodeHeight = this.getNodeHeight(node.right);
    return Math.max(leftNodeHeight, rightNodeHeight) + 1;
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  insertNode(node, key) {
    node = super.insertNode(node, key);

    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (key < node.left.key) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (key < node.right.key) {
        node = this.rotationRL(node);
      } else {
        node = this.rotationRR(node);
      }
    }

    return node;
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);

    if (node == null) {
      return node;
    }

    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        node = this.rotationLR(node);
      } else {
        node = this.rotationLL(node)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        node = this.rotationRL(node);
      } else {
        node = this.rotationRR(node);
      }
    }

    return node;
  }
}

const Colors = {
  BLACK: 'black',
  RED: 'red'
};

class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key;
    this.color = Colors.RED;
    this.parent = null;
  }

  isRed() {
    return this.color === Colors.RED;
  }
}

class RedBlackTree extends BinarySearchTree {
  constructor() {
    super();
    this.root = null;
  }

  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    if (node.left && node.left.key) {
      node.left.parent = node;
    }

    const parent = node.parent;
    tmp.parent = parent;
    if (!parent) {
      this.root = tmp;
    } else {
      if (node === parent.left) {
        parent.left = tmp;
      } else {
        parent.right = tmp;
      }
    }

    tmp.right = node;
    node.parent = tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    if (node.right && node.right.key) {
      node.right.parent = node;
    }

    const parent = node.parent;
    tmp.parent = parent;
    if (!parent) {
      this.root = tmp;
    } else {
      if (node === parent.left) {
        parent.left = tmp;
      } else {
        parent.right = tmp;
      }
    }

    tmp.left = node;
    node.parent = tmp;
  }

  insert(key) {
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const node = this.insertNode(this.root, key);
      this.fixTreeProperties(node);
    }
  }

  insertNode(node, key) {
    if (key < node.key) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (key > node.key) {
      if (node.right == null) {
        node.right = new RedBlackNode(key);
        node.right.parent = node;
        return node.right;
      } else {
        return this.insertNode(node.right, key);
      }
    }
  }

  fixTreeProperties(node) {
    while (node && node.parent && node.parent.isRed() && node.isRed()) {
      let parent = node.parent;
      const grandParent = parent.parent;

      if (grandParent && parent === grandParent.left) {
        const uncle = grandParent.right;
        if (uncle && uncle.isRed()) {
          uncle.color = Colors.BLACK;
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = grandParent;
        } else {
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          this.rotationLL(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      } else {
        const uncle = grandParent.left;
        if (uncle && uncle.isRed()) {
          uncle.color = Colors.BLACK;
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = grandParent;
        } else {
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          this.rotationRR(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }

    this.root.color = Colors.BLACK;
  }
}

const tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

const printNode = value => console.log(value);
tree.inOrderTraverse(printNode);