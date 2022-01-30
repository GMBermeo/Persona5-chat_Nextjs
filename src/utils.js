export function entortar(min, max) {
  return `rotate(${getRandomArbitrary(min, max)}deg)`;
}

export function bordasIrregulares(min, max) {
  return `solid white ${getRandomInt(min, max)}px`;
  //  + `borderBottom: ${getRandomInt(min, max)}px`
  //+`borderLeft: '${getRandomInt(min, max)}px,'` +
  //+`borderTop: '${getRandomInt(min, max)}px,'` +
  //+`borderRight: '${getRandomInt(min, max)}px'`
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
