// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'settings',
  myData?.userData.role_id
);
document.getElementById('body-content').style.display = 'block';
document.getElementById('logout-modal-container').innerHTML = logoutModal();

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

document.getElementById('sidebar-username').innerHTML =
  myData?.userData.username ?? '-';

document.getElementById('sidebar-email').innerHTML =
  myData?.userData.email ?? '-';

if (myData?.userData?.profile_image) {
  document.getElementById('sidebar-profile-image').src =
    myData.userData.profile_image.url;
}

document
  .getElementById('sidebar-logout-btn')
  .addEventListener('click', function (e) {
    $('#logoutModal').modal('show');
  });

document
  .getElementById('button-logout-yes')
  .addEventListener('click', clearSession);

// --- end auth function

const breadcrumbData = [
  {
    text: '<img alt="homelineI131" src="public/external/homelinei131-k1j1.svg" />',
    url: 'home-dashboard-user.html',
    isActive: false,
  },
  { text: 'Settings', url: 'settings-my-profile.html', isActive: true },
];
generateBreadcrumb(breadcrumbData);

let tabs = [];
var defaultTab = document.getElementById('my-profile-tab');
defaultTab.classList.add('show', 'active');
tabs.push(
  {
    id: 'my-profile-tab-content',
    title: 'My Profile',
    content: 'my-profile-tab',
  },
  {
    id: 'password-tab-content',
    title: 'Password',
    content: 'password-tab',
  }
);
let tabHTML = '';
for (let i = 0; i < tabs.length; i++) {
  let isActive = i === 0 ? 'active' : '';
  let isShow = i === 0 ? 'show' : '';
  tabHTML += `
    <li class="nav-item">
      <a
        class="nav-link ${isActive} ${isShow}"
        id="${tabs[i].id}"
        data-toggle="tab"
        href="#${tabs[i].content}"
        role="tab"
        aria-controls="${tabs[i].content}"
        aria-selected="${isActive}"
        >${tabs[i].title}</a
      >
    </li>
  `;
}
document.getElementById('myTab').innerHTML = tabHTML;

// -- file upload
var fileUploadPhoto = null;
const fileUpload = document.getElementById('file-upload');
const fileUploadName = document.getElementById('text-file-upload-name');
const imageProfile = document.getElementById('image-profile');
fileUpload.addEventListener('click', (event) => {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', 'image/*');

  fileInput.addEventListener('change', (event) => {
    handleFileUpload(event.target.files[0]);
  });

  fileInput.click();
});
fileUpload.addEventListener('dragover', (event) => {
  event.preventDefault();
});
fileUpload.addEventListener('drop', (event) => {
  event.preventDefault();
  handleFileUpload(event.dataTransfer.files[0]);
});
function handleFileUpload(file) {
  fileUploadPhoto = file;
  fileUploadName.innerHTML = `File: ${file.name}`;

  const objectUrl = URL.createObjectURL(file);
  imageProfile.setAttribute('src', objectUrl);
}
// -- end file upload

const inputUsername = document.getElementById('input-username');
const inputFirstName = document.getElementById('input-first-name');
const inputLastName = document.getElementById('input-last-name');
const inputPhoneNumber = document.getElementById('input-phone-number');
const inputEmail = document.getElementById('input-email');
const inputAddress1 = document.getElementById('input-address-1');
const inputAddress2 = document.getElementById('input-address-2');
const inputPostcode = document.getElementById('input-postcode');
const inputCity = document.getElementById('input-city');
const inputState = document.getElementById('input-state');
const inputSelectCountry = document.getElementById('input-select-country');
const inputBankName = document.getElementById('input-bank-name');
const inputBankAccountHolderName = document.getElementById(
  'input-bank-account-holder-name'
);
const inputBankAccountNumber = document.getElementById(
  'input-bank-account-number'
);
const inputSelectTimezone = document.getElementById('input-select-timezone');
const inputSelectCurrency = document.getElementById('input-select-currency');
const badgeStatus = document.getElementById('badge-status');
const textCreatedAt = document.getElementById('text-created-at');
const textExpiredAt = document.getElementById('text-expired-at');

document
  .getElementById('my-profile-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#save-my-profile-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    let formData = new FormData();
    formData.append('username', inputUsername.value);
    formData.append('first_name', inputFirstName.value);
    formData.append('last_name', inputLastName.value);
    formData.append('phone_number', inputPhoneNumber.value);
    formData.append('email', inputEmail.value);
    formData.append('address_1', inputAddress1.value);
    formData.append('address_2', inputAddress2.value);
    formData.append('postcode', inputPostcode.value);
    formData.append('city', inputCity.value);
    formData.append('state', inputState.value);
    formData.append('country_id', inputSelectCountry.value);
    formData.append('bank_name', inputBankName.value);
    formData.append(
      'bank_account_holder_name',
      inputBankAccountHolderName.value
    );
    formData.append('bank_account_number', inputBankAccountNumber.value);
    formData.append('currency_id', inputSelectCurrency.value);
    formData.append('timezone_name', inputSelectTimezone.value);
    formData.append('file_resource_profile_photo', fileUploadPhoto);

    const options = {
      body: formData,
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/setting/me/update',
      'POST',
      token,
      options,
      (headers = null)
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          saveData('masterData', {
            userData: data.user_data,
            authToken: myData.authToken,
          });
          showToast('alert-toast-container', 'Record saved!', 'success');
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function getAllTimezones(region = 'Asia/') {
  const timezones = [];
  const allTimezones = moment.tz.names();

  for (const timezone of allTimezones) {
    if (timezone.startsWith(region)) {
      timezones.push({ name: timezone });
    }
  }

  return timezones;
}

function getSettingDropdownData() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/setting/dropdown',
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        data.country_list.unshift({ id: '', name: 'Please Select' });
        data.country_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectCountry.appendChild(optionElement);
        });

        const timezones = getAllTimezones('Asia/');
        timezones.unshift({ id: '', name: 'Please Select' });
        timezones.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.name;
          optionElement.text = item.name;
          inputSelectTimezone.appendChild(optionElement);
        });

        data.currency_list.unshift({ id: '', name: 'Please Select' });
        data.currency_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = `${item.name} ${
            item?.short_name ? `(${item?.short_name})` : ''
          }`;
          inputSelectCurrency.appendChild(optionElement);
        });

        if (data.user.country_id) {
          const findSelectedCountry = data.country_list.find(
            (country) => country.id === data.user.country_id
          );
          if (findSelectedCountry) {
            const selectedOption = inputSelectCountry.querySelector(
              `option[value="${findSelectedCountry.id}"]`
            );
            if (selectedOption) {
              selectedOption.selected = true;
            }
          }
        }

        if (data.user.timezone_name) {
          const findSelectedTimezone = timezones.find(
            (timezone) => timezone.name === data.user.timezone_name
          );

          if (findSelectedTimezone) {
            const selectedOption = inputSelectTimezone.querySelector(
              `option[value="${findSelectedTimezone.name}"]`
            );
            if (selectedOption) {
              selectedOption.selected = true;
            }
          }
        }

        if (data.user.currency_id) {
          const findSelectedCurrency = data.currency_list.find(
            (currency) => currency.id === data.user.currency_id
          );
          if (findSelectedCurrency) {
            const selectedOption = inputSelectCurrency.querySelector(
              `option[value="${findSelectedCurrency.id}"]`
            );
            if (selectedOption) {
              selectedOption.selected = true;
            }
          }
        }

        if (data.user.profile_image) {
          imageProfile.setAttribute('src', data.user.profile_image.url);
        }

        if (data.user.is_active == true) {
          badgeStatus.innerHTML = `Active`;
        } else if (data.user.is_active == false) {
          badgeStatus.innerHTML = `Not Active`;
        } else {
          badgeStatus.innerHTML = '-';
        }

        if (data.user.created_at) {
          textCreatedAt.innerHTML = formatDate(data.user.created_at);
        } else {
          textCreatedAt.innerHTML = '-';
        }

        inputFirstName.value = data.user.first_name;
        inputLastName.value = data.user.last_name;
        inputUsername.value = data.user.username;
        inputPhoneNumber.value = data.user.phone_number;
        inputEmail.value = data.user.email;
        inputAddress1.value = data.user.address_1;
        inputAddress2.value = data.user.address_2;
        inputPostcode.value = data.user.postcode;
        inputCity.value = data.user.city;
        inputState.value = data.user.state;
        inputBankName.value = data.user.bank_name;
        inputBankAccountHolderName.value = data.user.bank_account_holder_name;
        inputBankAccountNumber.value = data.user.bank_account_number;
        lastUpdatedPassword.innerHTML = `Last reset on ${formatDate(
          data.user.last_updated_password
        )}`;
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

const lastUpdatedPassword = document.getElementById('last-reset-password');
const inputCurrentPassword = document.getElementById('input-current-password');
const inputNewPassword = document.getElementById('input-new-password');
const inputConfirmNewPassword = document.getElementById(
  'input-confirm-new-password'
);

document
  .getElementById('password-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#save-password-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        current_password: inputCurrentPassword.value,
        new_password: inputNewPassword.value,
        confirm_new_password: inputConfirmNewPassword.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/password/change',
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
          showToast('alert-toast-container', 'Record saved!', 'success');
          lastUpdatedPassword.innerHTML = `Last reset on ${formatDate(
            data.user.last_updated_password
          )}`;
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function firstCall() {
  getSettingDropdownData();
}

firstCall();
