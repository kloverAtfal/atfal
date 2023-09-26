document.getElementById('header-container').innerHTML = header('log-in');
document.getElementById('footer-container').innerHTML = footer('log-in');

document.getElementById('log-in-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let useBtn = document.querySelector('#submit-btn-log-in');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  const email = document.getElementById('input-email').value;
  const password = document.getElementById('input-password').value;

  const options = {
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/login',
    'POST',
    null,
    options
  )
    .then((data) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;

      if (data?.payload?.verify == false) {
        $('#reverifyModal').modal('show');
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        return;
      }

      if (data.code) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (data?.authToken) {
          saveData('masterData', {
            userData: data.userData,
            authToken: data.authToken,
          });

          if (data.userData.is_new_user) {
            location.href = 'setup-profile';
          } else {
            location.href = 'home-dashboard-user';
          }
        } else {
          showToast('alert-toast-container', data.message, 'danger');
        }
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
});

document
  .getElementById('go-to-forgot-password-modal')
  .addEventListener('click', function () {
    $('#forgotPasswordModal').modal('show');
  });

document
  .getElementById('forgot-password-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-btn-forgot-password');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const email = document.getElementById('input-email-forgot-password').value;

    const options = {
      body: JSON.stringify({
        email: email,
      }),
    };
    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/password/request-magic-link',
      'POST',
      null,
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
            'Password reset email sent. Please check your inbox for further instructions.',
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

document
  .getElementById('reverify-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-btn-reverify');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const emailVerifyInput = document.getElementById('input-email-reverify');

    const options = {
      body: JSON.stringify({
        email: emailVerifyInput.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/verify_email/resend',
      'POST',
      null,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data.code) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast('alert-toast-container', data.message, 'success');
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('button-continue-with-google')
  .addEventListener('click', function () {
    initGoogleCode();
  });

function initGoogleCode() {
  let useBtn = document.querySelector('#button-continue-with-google');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/oauth/google/init`,
    'GET',
    null
  )
    .then((data) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        window.location.href = data.authUrl;
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}

window.onload = function () {
  var curUrl = new URL(document.location.href);
  var code = curUrl.searchParams.get('code');

  if (code) {
    continueOauth(code);
  }
};

function continueOauth(code) {
  let useBtn = document.querySelector('#button-continue-with-google');
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/oauth/google/continue?code=${code}`,
    'POST',
    null
  )
    .then((data) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;

      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (data?.authToken) {
          saveData('masterData', {
            userData: data.userData,
            authToken: data.authToken,
          });
          if (data.userData.is_new_user) {
            location.href = 'setup-profile';
          } else {
            location.href = 'home-dashboard-user';
          }
        } else {
          showToast('alert-toast-container', 'Token not found', 'danger');
        }
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}
