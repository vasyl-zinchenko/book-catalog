function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, {
      id: 1,
      name: "Vasyl",
    });
  });
}

module.exports = { sum, subtract, fetchUser };
