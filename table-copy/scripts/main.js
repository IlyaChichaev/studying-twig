"use strict";

let start_t = new Date().getTime() / 1000;

const table_column = 1;
const k = -1;

function compaireRows(row1, row2) {
  if (!isNaN(Number(row1[table_column]))) {
    return k * Number(row1[table_column]) - k * Number(row2[table_column]);
  } else return row1[table_column] > row2[table_column] ? 1 * k : -1 * k;
}

let table = document.querySelector("tbody");
let lst = [],
  lst_into = [],
  rows = table.rows;

for (let row of table.rows) {
  lst_into = [];
  for (let item of row.children) {
    lst_into.push(item.innerHTML);
  }
  lst.push(lst_into);
}

let first_row = lst.shift();
lst.sort(compaireRows);
lst.unshift(first_row);

console.log(lst);

let i = 0;
for (let row of table.rows) {
  let j = 0;
  for (let item of row.children) {
    item.outerHTML = lst[i][j];
    j++;
  }
  i++;
}
console.log(i);

let end_t = new Date().getTime() / 1000;
console.log("End time:", end_t);
console.log("Start time:", start_t);
console.log(end_t - start_t);
