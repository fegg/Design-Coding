// 按层打印二叉树节点
function printLevel(root) {
  /**
     * res 外层
     * res.push([]) // [] 表示每一层内层
    */
   const res = [];

   if (!root) {
       return res;
   }

   // queue 表示每一层，从根节点开始
   const queue = [root];

   // 节点需要遍历完
   while(queue.length > 0) {
       // 先初始化每一层的数组
       // [[3], []] // 每次都初始化
       res.push([]); // [[]], [[第一层元素1, 第一层元素2], []]

       const size = queue.length;

       // 每一层放入的元素需要一次遍历, 最多遍历 2 次，如果到最后节点 node.left && node.right => null
       // queue size 就清空了
       for (let i = 1; i <= size; i++) {
           // 第一次循环只有 1 个元素
           // 从左打印到右
           const node = queue.shift(); // left, right
           // val
           const nodeValue = node.val;

           // res[1 - 1] => 初始化了一个空数组
           // res[0].push(nodeValue)

           // res[2 - 1].push(nodeLeftValue1, nodeRightValue1)
           // res[2 - 1].push(nodeLeftValue2, nodeRightValue2)
           res[res.length - 1].push(nodeValue); // res[0].push(nodeValue);

           // 每次都把 node 叶子字节都放进去，然后每次先 shift 出队完成
           if (node.left) {
               queue.push(node.left);
           }
           if (node.right) {
               queue.push(node.right);
           }
       }
   }

   return res;
}

// 是否对称
function isSymmetric(root) {
    return diff(root, root);

    function diff(p, q) {
        if (p === null && q === null) {
            return true;
        }

        if (p === null || q === null) {
            return false;
        }

        return p.val === q.val && diff(p.left, q.right) && diff(p.right, q.left);
    }
}

// 是否相等
function isSameTree(p, q) {
    if (p === null && q === null) {
        return true;
    }

    if (p === null && q !== null) {
        return false;
    }

    if (p !== null && q === null) {
        return false;
    }

    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
