document.getElementById('header-container').innerHTML = header('contact');
document.getElementById('footer-container').innerHTML = footer('contact');

document
  .getElementById('add-contact-us-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-contact-button');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        name: document.getElementById('input-contact-name').value,
        email: document.getElementById('input-contact-email').value,
        remarks: document.getElementById('input-contact-message').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/contact_us',
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
            'Successfully submitted!',
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
