const myData = getSavedData('masterData');
const token = myData?.authToken;

document
  .getElementById('sign-up-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let submitRegisterBtn = document.querySelector('#submit-btn-register');

    submitRegisterBtn.disabled = true;
    // submitRegisterBtn.innerHTML =
    //   '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;

    const options = {
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };
    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/auth/verify_email/signup',
      'POST',
      null,
      options
    )
      .then((data) => {
        submitRegisterBtn.disabled = false;
        // submitRegisterBtn.innerHTML = 'Register';
        if (data.code) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          showToast('alert-toast-container', data.message, 'success');
        }
      })
      .catch((error) => {
        submitRegisterBtn.disabled = false;
        // submitRegisterBtn.innerHTML = 'Register';
        alert(error);
      });
  });

document
  .getElementById('button-continue-login-with-google')
  .addEventListener('click', function () {
    initGoogleCode();
  });

var redirectUrl = 'https://gikijo.com/';
var successUrl = 'https://gikijo.com/home';
var selectRole = 'https://gikijo.com/account-type';

function initGoogleCode() {
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/oauth/google/init?redirect_uri=${redirectUrl}`,
    'POST',
    null
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        window.location.href = data.authUrl;
      }
    })
    .catch((error) => {
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
  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/oauth/google/continue?redirect_uri=${redirectUrl}&code=${code}`,
    'GET',
    null
  )
    .then((data) => {
      if (data?.message) {
        alert(data.message);
      } else {
        if (data?.authToken) {
          saveData('masterData', {
            userData: data.userData,
            authToken: data.authToken,
          });

          if (data.userData.role_id) {
            window.location.href = successUrl;
          } else {
            window.location.href = selectRole;
          }
        } else {
          alert('Token not found');
        }
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}
