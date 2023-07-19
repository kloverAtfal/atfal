document
  .getElementById('header-company-icon')
  .addEventListener('click', function () {
    window.location.href = 'index';
  });

var sendToken = null;

document
  .getElementById('return-to-login-btn')
  .addEventListener('click', function () {
    window.location.href = '/index';
  });

document
  .getElementById('reset-password-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-reset-password-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const newPasswordForm = document.getElementById('input-new-password');
    const confirmPassword = document.getElementById('input-confirm-password');

    if (sendToken !== null) {
      const newPassword = newPasswordForm.value;
      const repeatPassword = confirmPassword.value;

      if (newPassword !== repeatPassword) {
        showToast('alert-toast-container', 'Passwords do not match.', 'danger');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        return;
      } else {
        const options = {
          body: JSON.stringify({
            new_password: newPassword,
            confirm_password: repeatPassword,
          }),
        };

        fetchAPI(
          `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/password/reset`,
          'POST',
          sendToken,
          options
        )
          .then((data) => {
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;

            if (data === undefined) {
              showToast(
                'alert-toast-container',
                'Something went wrong.',
                'danger'
              );
            } else {
              showToast('alert-toast-container', data.message, 'success');
            }
          })
          .catch((error) => {
            useBtn.disabled = false;
            useBtn.innerHTML = defaultBtnText;
            console.log('error', error);
          });
      }
    } else {
      showToast('alert-toast-container', 'Token not found.', 'danger');
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    }
  });

function verifyMagicToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const magicToken = urlParams.get('token');

  if (magicToken) {
    const options = {
      body: JSON.stringify({
        magic_token: magicToken,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/verify_magic_token/auth_token',
      'POST',
      null,
      options
    )
      .then((data) => {
        if (data.authToken) {
          sendToken = data.authToken;
        } else {
          showToast('alert-toast-container', data.message, 'danger');
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  } else {
    showToast('alert-toast-container', 'Token not found.', 'danger');
  }
}

verifyMagicToken();
