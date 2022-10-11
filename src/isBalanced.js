/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @title 是否平衡二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced(root) {
  // 遍历到最后节点
  if (root === null) {
    return true;
  }

  // 下一层均无子节点
  if (root.left === null && root.right === null) {
    return true; // 只有根节点
  }

  // 断言
  const isMore = Math.abs(getDepth(root.left) - getDepth(root.right)) > 1;
  if (isMore) {
    return false;
  }

  return isBalanced(root.left) && isBalanced(root.right);
};

function getDepth(root) {
  // 一直获取到叶子节点
  if(root == null) {
    return 0;
  }

  return Math.max(getDepth(root.left), getDepth(root.right)) + 1;
}
