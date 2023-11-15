function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

const list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

var mergeTwoLists = function (list1, list2) {
    if (list1 === null && list2 === null) return null;
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    let head = new ListNode();

    let l1 = list1;
    let l2 = list2;
    // 当前遍历的节点  O(1)
    let node = head;

    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            node.next = l1; // head.next head.next.next
            l1 = l1.next;
        } else {
            node.next = l2;
            l2 = l2.next;
        }

        node = node.next;
    }

    // 合并后有剩余的情况
    // l1.next === null 表示 l1 先结束查询
    node.next = l1 !== null ? l1 : l2;

    // 头节点不需要
    return head.next;
};

mergeTwoLists(list1, list2);
