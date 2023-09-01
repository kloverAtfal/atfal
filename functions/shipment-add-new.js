// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'shipment',
  sidebarNavigationLoaded()
);

function sidebarNavigationLoaded() {
  document.getElementById('body-content').style.display = 'block';
  document.getElementById('logout-modal-container').innerHTML = logoutModal();
}

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
});

document.getElementById('sidebar-username').innerHTML =
  myData?.userData.username ?? '-';

document.getElementById('sidebar-email').innerHTML =
  myData?.userData.email ?? '-';

document
  .getElementById('sidebar-logout-btn')
  .addEventListener('click', function (e) {
    $('#logoutModal').modal('show');
  });

document
  .getElementById('button-logout-yes')
  .addEventListener('click', clearSession);

// --- end auth function

const inputSelectParcel = document.getElementById('input-select-parcel');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const inputPhoneNumber = document.getElementById('input-phone-number');
const inputAddress1 = document.getElementById('input-address-1');
const inputAddress2 = document.getElementById('input-address-2');
const inputPostcode = document.getElementById('input-postcode');
const inputCity = document.getElementById('input-city');
const inputState = document.getElementById('input-state');
const inputSelectCountry = document.getElementById('input-select-country');

document
  .getElementById('go-to-dashbaord-btn')
  .addEventListener('click', function (e) {
    location.href = 'shipment-dashboard';
  });

document
  .getElementById('create-parcel-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'parcel-dashboard.html?code=new';
  });

document
  .getElementById('shipment-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#submit-shipment-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    var selectedParcel = [];
    $('#input-select-parcel :selected').each(function () {
      selectedParcel.push({ parcel_id: $(this).val() });
    });

    if (selectedParcel.length == 0) {
      showToast('alert-toast-container', 'Parcel not selected', 'danger');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    const options = {
      body: JSON.stringify({
        name: inputName.value,
        email: inputEmail.value,
        phone_number: inputPhoneNumber.value,
        address_1: inputAddress1.value,
        address_2: inputAddress2.value,
        postcode: inputPostcode.value,
        city: inputCity.value,
        state: inputState.value,
        country_id: inputSelectCountry.value,
        selected_parcel: selectedParcel,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment',
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
          $('#shipmentAddedModal').modal('show');
          document.getElementById(
            'text-new-shipment-id'
          ).innerHTML = `${data.custom_id}`;
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function getShipmentDropdownData() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment/dropdown/data',
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        data.parcel_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = `${item.tracking_number} (${item.content})`;
          inputSelectParcel.appendChild(optionElement);
        });

        setTimeout(() => {
          MultiselectDropdown(window.MultiselectDropdownOptions);
        }, 500);

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
  getShipmentDropdownData();

  // // initiate on changes
  // $('#input-select-parcel').change(function () {
  //   var selected = [];
  //   $('#input-select-parcel :selected').each(function () {
  //     selected.push($(this).text());
  //   });
  //   $('#selected-parcel').text(selected.join(', '));
  // });
}

firstCall();
