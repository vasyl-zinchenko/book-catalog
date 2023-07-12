/**
 * @param {function} callback
 * @param {number} delay
 *
 * @returns {function}
 */

function debounce(callback, delay) {}

module.exports = { debounce };

function printArgs(...args) {
  console.log(args);
}

const wrapper = debounce(printArgs, 1000);

wrapper(1);

setTimeout(() => {
  wrapper(2, 3, 4);
}, 700);

setTimeout(() => {
  wrapper(5, 6);
}, 1200);

setTimeout(() => {
  wrapper(7, 8, 9);
}, 3000);

//Prints [5,6] after 2200 ms
//Prints [7,8,9] after 4000ms
