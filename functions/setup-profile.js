if (!token) {
  location.href = 'index';
}

document
  .getElementById('header-company-icon')
  .addEventListener('click', function () {
    window.location.href = 'index';
  });

// document
//   .getElementById('skip-setup-profile-btn')
//   .addEventListener('click', function () {
//     location.href = 'home-dashboard-user';
//   });

const inputFirstName = document.getElementById('input-first-name');
const inputLastName = document.getElementById('input-last-name');
const inputPhoneNumber = document.getElementById('input-phone-number');
const inputAddress1 = document.getElementById('input-address-1');
const inputAddress2 = document.getElementById('input-address-2');
const inputPostcode = document.getElementById('input-postcode');
const inputCity = document.getElementById('input-city');
const inputState = document.getElementById('input-state');
const inputSelectCountry = document.getElementById('input-select-country');
const inputRefferalCode = document.getElementById('input-refferal-code');

document
  .getElementById('setup-profile-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#setup-profile-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        first_name: inputFirstName.value,
        last_name: inputLastName.value,
        phone_number: inputPhoneNumber.value,
        address_1: inputAddress1.value,
        address_2: inputAddress2.value,
        postcode: inputPostcode.value,
        city: inputCity.value,
        state: inputState.value,
        country_id: inputSelectCountry.value,
        referral_code: inputRefferalCode.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/setup/profile/update',
      'PUT',
      token,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;

        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          location.href = 'home-dashboard-user';
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function getSetupDropdownData() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/setup/profile/dropdown',
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
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

function firstCall() {
  getSetupDropdownData();
}

firstCall();
