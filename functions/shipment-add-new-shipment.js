if (!token) {
  location.href = 'index';
}

function sidebarNavigationLoaded() {
  document.getElementById('body-content').style.display = 'block';
  document.getElementById('logout-modal-container').innerHTML = logoutModal();
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'shipment',
  sidebarNavigationLoaded()
);

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

const inputSelectParcel = document.getElementById('input-select-parcel');
const inputSenderName = document.getElementById('input-sender-name');
const inputSenderEmail = document.getElementById('input-sender-email');
const inputSenderPhoneNumber = document.getElementById(
  'input-sender-phone-number'
);
const inputSenderAddress1 = document.getElementById('input-sender-address-1');
const inputSenderAddress2 = document.getElementById('input-sender-address-2');
const inputSenderPostcode = document.getElementById('input-sender-postcode');
const inputSenderCity = document.getElementById('input-sender-city');
const inputSenderStateProvince = document.getElementById(
  'input-sender-state-province'
);

const inputSelectSaveAddress = document.getElementById(
  'input-select-save-address'
);
const inputReceiverName = document.getElementById('input-receiver-name');
const inputReceiverEmail = document.getElementById('input-receiver-email');
const inputReceiverPhoneNumber = document.getElementById(
  'input-receiver-phone-number'
);
const inputReceiverAddress1 = document.getElementById(
  'input-receiver-address-1'
);
const inputReceiverAddress2 = document.getElementById(
  'input-receiver-address-2'
);
const inputReceiverPostcode = document.getElementById(
  'input-receiver-postcode'
);
const inputReceiverCity = document.getElementById('input-receiver-city');
const inputReceiverStateProvince = document.getElementById(
  'input-receiver-state-province'
);
const inputCourierCompany = document.getElementById('input-courier-company');
const inputCourierPickupDate = document.getElementById(
  'input-courier-pickup-date'
);

var saveAddressList = [];
inputSelectSaveAddress.addEventListener('change', handleSelectChange);

function handleSelectChange(event) {
  const selectedOption = event.target.value;

  const selectedItem =
    saveAddressList.find(
      (item) => item.id.toString() === selectedOption && item.id !== ''
    ) || {};

  inputReceiverName.value = selectedItem.name || '';
  inputReceiverPhoneNumber.value = selectedItem.phone_number || '';
  inputReceiverEmail.value = selectedItem.email || '';
  inputReceiverAddress1.value = selectedItem.address_1 || '';
  inputReceiverAddress2.value = selectedItem.address_2 || '';
  inputReceiverPostcode.value = selectedItem.postcode || '';
  inputReceiverCity.value = selectedItem.city || '';
  inputReceiverStateProvince.value = selectedItem.state_province || '';
}

inputCourierCompany.addEventListener('change', handleSelectChangeCourrier);

const courierServiceSection = document.getElementById(
  'courier-service-section'
);
const pickupSection1 = document.getElementById('pickup-section-1');
const pickupSection2 = document.getElementById('pickup-section-2');
const totalPriceMYR = document.getElementById('total-in-myr');

var courrierCompanyList = [];
var selectedCourier = null;

function handleSelectChangeCourrier(event) {
  const selectedOption = event.target.value;
  const selectedItem =
    courrierCompanyList.find(
      (item) => item.service_id.toString() === selectedOption && item.id !== ''
    ) || {};

  selectedCourier = selectedItem;

  if (selectedItem.price) {
    totalPriceMYR.innerHTML = `${formatNumber(selectedItem.price)}`;
  }

  if (selectedItem.type) {
    if (selectedItem.type == 'pick_up') {
      pickupSection1.removeAttribute('style');
      pickupSection2.removeAttribute('style');
    } else {
      pickupSection1.setAttribute('style', 'display: none');
      pickupSection2.setAttribute('style', 'display: none');
    }
  }
}

var selectedParcel = [];

document
  .getElementById('shipment-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#get-available-courier-btn');
    let defaultBtnText = useBtn.innerHTML;

    selectedParcel.push(inputSelectParcel.value);

    courierDetailFormSubmitted = true;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        from_postcode: inputSenderPostcode.value,
        to_postcode: inputReceiverPostcode.value,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        service_type: 0,
      }),
    };

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment/courier/price`,
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
          if (data.services.data.length !== 0) {
            courierServiceSection.removeAttribute('style');
            courrierCompanyList = data.services.data;
            courrierCompanyList.unshift({
              service_id: '',
              courier_title: 'Please Select',
              type: '',
            });
            // Clear existing child elements
            inputCourierCompany.innerHTML = '';
            courrierCompanyList.map((item) => {
              const optionElement = document.createElement('option');
              optionElement.value = item.service_id;
              optionElement.text = `${item.courier_title} ${
                item.type == 'drop_off'
                  ? '- Drop off'
                  : item.type == 'pick_up'
                  ? '- Pick up'
                  : ''
              }`;
              inputCourierCompany.appendChild(optionElement);
            });
          } else {
            courierServiceSection.setAttribute('style', 'display: none');
            showToast(
              'alert-toast-container',
              'No courrier available',
              'danger'
            );
          }
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
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        data.parcel_list.map((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = `Tracking: ${item.tracking_number}, content: ${item.content}`;
          inputSelectParcel.appendChild(optionElement);
        });

        saveAddressList = data.address_list;
        saveAddressList.unshift({ id: '', name: 'Please Select' });
        saveAddressList.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.id
            ? `${item.name}, ${item.phone_number}, ${item.email}, ${item.address_1}`
            : `${item.name}`;

          inputSelectSaveAddress.appendChild(optionElement);
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

document
  .getElementById('check-out-btn')
  .addEventListener('click', function (e) {
    let useBtn = document.getElementById('check-out-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    var tempParcelId = [];
    selectedParcel.map((item) => {
      tempParcelId.push({ parcel_id: item.id });
    });

    if (selectedCourier == null) {
      showToast(
        'alert-toast-container',
        'Please select courier service',
        'danger'
      );
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    const options = {
      body: JSON.stringify({
        sender_name: inputSenderName.value,
        sender_phone_number: inputSenderPhoneNumber.value,
        sender_email: inputSenderEmail.value,
        sender_address_1: inputSenderAddress1.value,
        sender_address_2: inputSenderAddress2.value,
        sender_postcode: inputSenderPostcode.value,
        sender_city: inputSenderCity.value,
        sender_state_province: inputSenderStateProvince.value,

        receiver_name: inputReceiverName.value,
        receiver_phone_number: inputReceiverPhoneNumber.value,
        receiver_email: inputReceiverEmail.value,
        receiver_address_1: inputReceiverAddress1.value,
        receiver_address_2: inputReceiverAddress2.value,
        receiver_postcode: inputReceiverPostcode.value,
        receiver_city: inputReceiverCity.value,
        receiver_state_province: inputReceiverStateProvince.value,

        selected_parcel: tempParcelId,

        courier: {
          service_id: selectedCourier.service_id,
          name: selectedCourier.courier_title,
          method: selectedCourier.type,
          price: selectedCourier.price,
        },
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
          showToast('alert-toast-container', 'Successfully added!', 'success');
          if (data.custom_id) {
            showToast(
              'alert-toast-container',
              'Redirect to payment gateway...',
              'success'
            );
            payShipment(data.custom_id);
          }
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function payShipment(custom_id) {
  const options = {
    body: JSON.stringify({
      shipment_custom_id: custom_id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/payment/shipment`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        const paymentUrl = `${data.paymentURL}/${data.paymentResult[0].BillCode}`;
        if (paymentUrl) {
          window.open(paymentUrl, '_self');
        } else {
          showToast(
            'alert-toast-container',
            'Something went wrong, please try again',
            'danger'
          );
        }
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

getShipmentDropdownData();
