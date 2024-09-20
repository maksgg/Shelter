let user = {
  name: 'Іван',
  age: 30
};

function sumSalaries() {
  let sum = Object.entries(user).length;
  console.log(sum);
}
sumSalaries();