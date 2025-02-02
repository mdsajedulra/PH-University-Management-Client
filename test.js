const arr = [1, 3, 5, 6];

const result = arr.reduce((accmuladator, items) => {
  accmuladator.push(items);
  return accmuladator;
}, []);

console.log(result);
