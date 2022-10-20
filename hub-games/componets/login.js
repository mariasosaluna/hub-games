const signUp = document.getElementById('signUp');
if (signUp) {
  signUp.addEventListener('click', (event) => {
    const input = document.getElementById('input');
    if (input.value) {
      window.localStorage.setItem('user', input.value);
      window.location.assign('./pages/dashboard.html');
      input.value = '';
    }
  });
}
