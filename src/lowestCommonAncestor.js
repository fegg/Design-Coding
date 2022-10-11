/**
 * @title 二叉树的最近公共祖先
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
export function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }

  // 先深度先序遍历去查找出来
  const leftRootNode = lowestCommonAncestor(root.left, p, q);
  const rightRootNode = lowestCommonAncestor(root.right, p, q);

  if (leftRootNode === null && rightRootNode === null) {
    return null;
  }

  if (leftRootNode === null) {
    return rightRootNode;
  }

  if (rightRootNode === null) {
    return leftRootNode;
  }

  return root;
}
