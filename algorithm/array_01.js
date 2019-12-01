// 在一个二维数组中（每个一维数组的长度相同），
// 每一行都按照从左到右递增的顺序排序，
// 每一列都按照从上到下递增的顺序排序。
// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

const array = [
    [1, 2, 3, 4, 5],
    [3, 4, 5, 6, 7],
    [5, 6, 7, 8, 9],
    [7, 8, 9, 10, 11]
];

{
    function Find (target, array) {
        return array.some(item => {
            return item.some(subItem => {
                return subItem === target;
            });
        });
    }
}

{
    function Find (target, array) {
        return array.some(item => {
            return item.includes(target);
        });
    }
}

{
    function Find (target, array) {
        const startX = 0,
            startY = 0,
            endX = array[0].length - 1,
            endY = array.length - 1;

        for (let Y = endY; Y >= startY; Y--) {
            if (target > array[Y][endX]) {
                return false;
            }

            if (FindBinary(target, array, startX, endX, Y)) {
                return true;
            }
        }

        return false;

        // 二分查找
        function FindBinary (target, array, startX, endX, Y) {
            // 递归结束条件
            if (startX > endX) {
                return false;
            }

            if (target < array[Y][startX] || target > array[Y][endX]) {
                return false;
            }
            if (target === array[Y][startX] || target === array[Y][endX]) {
                return true;
            }

            const middle = Math.floor((startX + endX) / 2);

            if (target === array[Y][middle]) {
                return true;
            }
            else if (target < array[Y][middle]) {
                return FindBinary(target, array, startX, middle - 1, Y);
            }
            else {
                return FindBinary(target, array, middle + 1, endX, Y);
            }
        }
    }
}