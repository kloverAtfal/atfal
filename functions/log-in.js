const myData = getSavedData('masterData');
const token = myData?.authToken;

const spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

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
      if (data.code) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (data?.authToken) {
          saveData('masterData', {
            userData: data.userData,
            authToken: data.authToken,
          });
          location.href = '/home-dashboard-user';
        } else {
          showToast('alert-toast-container', data.message, 'danger');
        }
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      alert(error);
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
          location.href = '/home-dashboard-user';
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
