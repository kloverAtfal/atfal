document.getElementById('header-container').innerHTML = header('index');
document.getElementById('footer-container').innerHTML = footer('index');

document
  .getElementById('log-in-nav-btn')
  .addEventListener('click', function () {
    window.location.href = 'log-in';
  });

document
  .getElementById('sign-up-nav-btn')
  .addEventListener('click', function () {
    window.location.href = 'sign-up';
  });

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  // Function to add or remove the "navbar-scrolled" class based on scroll position
  function toggleNavbarBlur() {
    if (window.scrollY > 0) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  // Call the function on page load and whenever the user scrolls
  toggleNavbarBlur();
  window.addEventListener('scroll', toggleNavbarBlur);
});
