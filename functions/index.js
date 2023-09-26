document.getElementById('header-container').innerHTML = header('index');
document.getElementById('footer-container').innerHTML = footer('index');

document
  .getElementById('sign-up-main-btn')
  .addEventListener('click', function () {
    window.location.href = 'sign-up';
  });
