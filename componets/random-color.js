const btn = document.getElementById('color-changer');

btn.addEventListener('click', (event) => {
  const getRandomNumber = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
  };
  const r = getRandomNumber(256);
  const g = getRandomNumber(256);
  const b = getRandomNumber(256);

  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
});
