// export var color = "blue";
// export let name = "Nicholas";
// export const magicNumber = 7;

// export function sum(num1, num2) {
//   return num1 + num2;
// }

// export class Rectangle {
//   constructor(length, width) {
//     this.length = length;
//     this.width = width;
//   }
// }

// function subtract(num1, num2) {
//   return num1 - num2;
// }

// function multiply(num1, num2) {
//   return num1 * num2;
// }

// export {
//   multiply,
//   sum as add,
//   sum as default
// };

// // export default function(num1, num2) {
// //   return num1 + num2;
// // }

// // export default sum;

Array.prototype.pushAll = function(items) {
  if (!Array.isArray(items)) {
    throw new TypeError("Argument must be an array.");
  }

  return this.push(...items);
};
