const spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

window.onload = function () {
  var curUrl = new URL(document.location.href);
  var code = curUrl.searchParams.get('token');

  if (code) {
    continueMagic(code);
  } else {
    showToast('alert-toast-container', 'Token not found', 'danger');
  }
};

function continueMagic(magicToken) {
  let useBtn = document.getElementById('text-verify');
  let defaultBtnText = useBtn.innerHTML;

  // useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  const options = {
    body: JSON.stringify({
      magic_token: magicToken,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT:v1/auth/verify_email/magic_login`,
    'POST',
    null,
    options
  )
    .then((data) => {
      // useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;

      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (data?.authToken) {
          showToast(
            'alert-toast-container',
            'Verification completed, you are being redirected to dashboard, please wait...',
            'success'
          );
          saveData('masterData', {
            userData: data.userData,
            authToken: data.authToken,
          });
          setTimeout(() => {
            location.href = '/home-dashboard-user';
          }, 2000);
        } else {
          showToast('alert-toast-container', 'Token not found', 'danger');
        }
      }
    })
    .catch((error) => {
      // useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}
