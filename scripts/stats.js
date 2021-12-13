let caloriesDiv = document.querySelector(".calories");
let distanceDiv = document.querySelector(".distance");
let moveMinDiv = document.querySelector(".move-min");

let calories = Math.round(values[0].steps * 0.04);
let distance = values[0].steps * 0.0009;
let moveMin = Math.round(values[0].steps * 0.01);

caloriesDiv.innerHTML = `<p>${calories} </p><p>Cal </p>`;
distanceDiv.innerHTML = `<p>${distance.toFixed(2)} </p><p>km </p>`;
moveMinDiv.innerHTML = `<p>${moveMin} </p><p>Move Min </p>`;
