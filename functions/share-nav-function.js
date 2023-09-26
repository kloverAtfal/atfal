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

document
  .getElementById('add-subscribe-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-subscribe-button');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        email: document.getElementById('input-subscribe-email').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/subscribe',
      'POST',
      token,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast(
            'alert-toast-container',
            'Successfully subscribed!',
            'success'
          );
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
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
