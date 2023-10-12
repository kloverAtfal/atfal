// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'admin',
  sidebarNavigationLoaded()
);

function sidebarNavigationLoaded() {
  document.getElementById('body-content').style.display = 'block';
  document.getElementById('logout-modal-container').innerHTML = logoutModal();
  document.getElementById('edit-parcel-modal-container').innerHTML =
    editParcelModal();
  document.getElementById('edit-shipment-modal-container').innerHTML =
    editShipmentModal();
  document.getElementById('edit-transaction-modal-container').innerHTML =
    editTransactionModal();
  document.getElementById('edit-payout-modal-container').innerHTML =
    editPayoutModal();
  document.getElementById('edit-user-modal-container').innerHTML =
    editUserModal();
  document.getElementById('add-career-modal-container').innerHTML =
    editCareerModal('add');
  document.getElementById('edit-career-modal-container').innerHTML =
    editCareerModal('edit');
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

let tabs = [];
var defaultTab = document.getElementById('parcel-tab');
defaultTab.classList.add('show', 'active');
tabs.push(
  {
    id: 'parcel-tab-content',
    title: 'All Parcel',
    content: 'parcel-tab',
  },
  {
    id: 'shipment-tab-content',
    title: 'All Shipment',
    content: 'shipment-tab',
  },
  {
    id: 'transaction-tab-content',
    title: 'All Transaction',
    content: 'transaction-tab',
  },
  {
    id: 'payout-tab-content',
    title: 'All Payout',
    content: 'payout-tab',
  },
  {
    id: 'users-tab-content',
    title: 'All User',
    content: 'users-tab',
  },
  {
    id: 'rate-and-fees-tab-content',
    title: 'Rate and Fees',
    content: 'rate-and-fees-tab',
  },
  {
    id: 'currency-pair-content',
    title: 'Currency Rate',
    content: 'currency-pair-tab',
  },
  {
    id: 'career-tab-content',
    title: 'All Career',
    content: 'career-tab',
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

let tabsCareer = [];
var defaultTabCareer = document.getElementById('career-tab-1');
defaultTabCareer.classList.add('show', 'active');
tabsCareer.push(
  {
    id: 'career-tab-content-1',
    title: 'Career List',
    content: 'career-tab-1',
  },
  {
    id: 'career-tab-content-2',
    title: 'Application List',
    content: 'career-tab-2',
  }
);

let tabHTMLCareer = '';
for (let i = 0; i < tabsCareer.length; i++) {
  let isActive = i === 0 ? 'active' : '';
  let isShow = i === 0 ? 'show' : '';
  tabHTMLCareer += `
    <li class="nav-item">
      <a
        class="nav-link ${isActive} ${isShow}"
        id="${tabsCareer[i].id}"
        data-toggle="tab"
        href="#${tabsCareer[i].content}"
        role="tab"
        aria-controls="${tabsCareer[i].content}"
        aria-selected="${isActive}"
        >${tabsCareer[i].title}</a
      >
    </li>
  `;
}

document.getElementById('myTab').innerHTML = tabHTML;
document.getElementById('myNestedTabCareer').innerHTML = tabHTMLCareer;

// to handle empty space between switching tab
const tabParentElement = document.getElementById('myNestedTabCareer');
tabParentElement.addEventListener('click', function (event) {
  if (event.target.classList.contains('nav-link')) {
    const activeTabId = event.target.id;
    if (activeTabId == 'career-tab-content-1') {
      document.getElementById('career-tab-1-container').style.display = 'block';
      document.getElementById('career-tab-2-container').style.display = 'none';
    }
    if (activeTabId == 'career-tab-content-2') {
      document.getElementById('career-tab-2-container').style.display = 'block';
      document.getElementById('career-tab-1-container').style.display = 'none';
    }
  }
});

const tableLoader = document.getElementById('table-loader');
const tableLoader2 = document.getElementById('table-loader2');
const tableLoader3 = document.getElementById('table-loader3');
const tableLoader4 = document.getElementById('table-loader4');
const tableLoader5 = document.getElementById('table-loader5');
const tableLoaderCareer = document.getElementById('table-loader-career');
const tableLoaderCareerApplication = document.getElementById(
  'table-loader-career-application'
);

var selectedRowIndex = null;

var feeData = [];
var preId_fee = 'input-fee';
var rateData = [];
var preId_rate = 'input-rate';
var currencyData = [];
var preId_currency = 'input-currency';

var totalPrice = document.getElementById('total-price-shipment');
const inputShippingPrice = document.getElementById('input-shipping-price');
const inputShippingFee = document.getElementById('input-shipping-fee');

var shipmentFreeDefaultValue = 0;

document
  .getElementById('add-new-career-btn')
  .addEventListener('click', function (e) {
    e.preventDefault();
    $('#addCareerModal').modal('show');
  });

inputShippingPrice.addEventListener('input', function () {
  totalPrice.innerHTML = `...`;
  clearTimeout(this.timerId);
  this.timerId = setTimeout(() => {
    populateToEditShipmentFee();
  }, 1000);
});

function populateToEditShipmentFee() {
  totalPrice.innerHTML = 0;
  var price1 = inputShippingPrice.value
    ? parseFloat(inputShippingPrice.value)
    : 0;
  var price2 = inputShippingFee.value ? parseFloat(inputShippingFee.value) : 0;
  const fee_price = (price2 / 100) * price1;
  const formattedTotal = price1 + fee_price;
  totalPrice.innerHTML = parseFloat(formattedTotal.toFixed(2)).toString();
}

function editParcel(passId) {
  $('#editParcelModal').modal('show');
  populateToForm(passId, getTableData('#parcel_table'), {
    'input-parcel-id': 'id',
    'input-parcel-custom-id': 'custom_id',
    'input-select-parcel-status': 'parcel_status_data.id',
  });
}

function editShipment(passId) {
  $('#editShipmentModal').modal('show');
  populateToForm(passId, getTableData('#shipment_table'), {
    'input-shipping-id': 'id',
    'input-shipping-custom-id': 'custom_id',
    'input-shipping-price': 'shipment_price_data.price_myr',
    'input-shipping-fee': 'shipment_price_data.fee_percentage',
    'input-select-shipment-status': 'shipping_status_id',
    'input-select-allow-to-pay': 'shipment_price_data.allow_payment',
  });

  populateToEditShipmentFee();

  // if (foundObject) {
  //   if (foundObject?.shipment_price_data) {
  //     inputShippingPrice.value = foundObject.shipment_price_data.price_myr;
  //     inputShippingFee.value = foundObject.shipment_price_data.fee_percentage;

  //     inputSelectShipmentStatus.value = foundObject.shipping_status_id;
  //     inputSelectAllowToPay.value =
  //       foundObject.shipment_price_data.allow_payment;

  //     if (foundObject.shipment_price_data.payment_status_data.id == 1) {
  //       inputShippingPrice.disabled = true;

  //       inputSelectAllowToPay.disabled = true;
  //     } else {
  //       inputShippingPrice.disabled = false;

  //       inputSelectAllowToPay.disabled = false;
  //     }
  //   } else {
  //     inputShippingPrice.value = 0;
  //     inputShippingFee.value = shipmentFreeDefaultValue;

  //     inputSelectShipmentStatus.value = '';
  //     inputSelectAllowToPay.value = '';

  //     inputShippingPrice.disabled = false;

  //     inputSelectAllowToPay.disabled = false;
  //   }

  //   document.getElementById('edit-shipment-id').innerHTML =
  //     foundObject.custom_id;
  //   selectedShipmentCustomId = foundObject.custom_id;
  //   populateToEditShipmentFee();
  //   $('#editShipmentModal').modal('show');
  // }
}

const fileUploadInstance = initializeFileUpload(
  'payout-file-upload',
  'payout-text-file-upload-name',
  'payout-preview-image'
);

function editPayout(passId) {
  $('#editPayoutModal').modal('show');

  fileUploadInstance.clearFile();

  populateToForm(passId, getTableData('#payout_table'), {
    'input-payout-user-id': 'id',
    'input-payout-username': 'username',
  });

  var foundObject = getTableData('#payout_table').find(function (obj) {
    return obj.id.toString() === passId.toString();
  });

  if (foundObject) {
    var shipment_list = [];
    var transaction_list = [];
    var total_shipment = 0;
    var total_transaction = 0;
    var total = 0;
    var totalPaid = 0;

    if (foundObject.referrals_of_user_data.length > 0) {
      foundObject.referrals_of_user_data.map((item) => {
        if (item.shipment_price_of_user_data.length > 0) {
          item.shipment_price_of_user_data.map((item2) => {
            shipment_list.push(item2);
          });
        }

        if (item.topup_price_of_user_data.length > 0) {
          item.topup_price_of_user_data.map((item3) => {
            transaction_list.push(item3);
          });
        }
      });
    }

    shipment_list.map(function (item) {
      if (item.payment_status_id == 1 && item.payout_payment_status_id !== 1) {
        var price = item.price_myr ? parseFloat(item.price_myr) : 0;
        var comm = item.payout_percentage
          ? parseFloat(item.payout_percentage)
          : 0;

        total_shipment = total_shipment + (comm / 100) * price;
      }
    });

    transaction_list.map(function (item) {
      if (item.payment_status_id == 1 && item.payout_payment_status_id !== 1) {
        var price = item.price_myr ? parseFloat(item.price_myr) : 0;
        var comm = item.payout_percentage
          ? parseFloat(item.payout_percentage)
          : 0;

        total_transaction = total_transaction + (comm / 100) * price;
      }
    });

    total = total_shipment + total_transaction;

    if (foundObject.referrals_payment_of_user_data.length !== 0) {
      foundObject.referrals_payment_of_user_data.map((item) => {
        totalPaid = totalPaid + item.amount_paid;
      });
    }

    total = total - totalPaid;

    getMyElement('input-total-pending-payout').value = `RM ${parseFloat(
      total.toFixed(2)
    ).toString()}`;
  }

  $('#editPayoutModal').modal('show');
}

function editUser(passId) {
  $('#editUserModal').modal('show');
  populateToForm(passId, getTableData('#users_table'), {
    'input-user-user-id': 'id',
    'input-user-username': 'username',
    'input-select-user-role': 'role_data.id',
  });
}

function editTransaction(passId) {
  $('#editTransactionModal').modal('show');
  populateToForm(passId, getTableData('#transaction_table'), {
    'input-transaction-id': 'id',
    'input-transaction-custom-id': 'custom_id',
    'input-select-transaction-status': 'topup_status_data.id',
  });
}

function editCareer(passId) {
  $('#editCareerModal').modal('show');
  populateToForm(passId, getTableData('#career_table'), {
    'input-edit-career-id': 'id',
    'input-edit-career-title': 'title',
    'input-edit-career-description': 'description',
    'input-edit-career-type': 'type',
    'input-edit-career-location': 'location',
    'input-edit-career-tag': 'tag',
  });
}

function viewApplicant(passId) {
  $('#editCareerModal').modal('show');
}

document
  .getElementById('edit-parcel-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-parcel-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        custom_id: getMyElement('input-parcel-custom-id').value,
        parcel_status_id: getMyElement('input-select-parcel-status').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/parcel',
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
          updateTableDataById('#parcel_table', data.newData);
          parcelSummary(getTableData('#parcel_table'));
          $('#editParcelModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
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
  .getElementById('edit-shipment-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-shipment-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        custom_id: getMyElement('input-shipping-custom-id').value,
        shipping_status_id: getMyElement('input-select-shipment-status').value,
        price_myr: getMyElement('input-shipping-price').value,
        allow_payment: getMyElement('input-select-allow-to-pay').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/shipment',
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
          updateTableDataById('#shipment_table', data.newData);
          shipmentSummary(getTableData('#shipment_table'));
          $('#editShipmentModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
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
  .getElementById('edit-transaction-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-transaction-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        custom_id: getMyElement('input-transaction-custom-id').value,
        topup_status_id: getMyElement('input-select-transaction-status').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/top_up',
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
          updateTableDataById('#transaction_table', data.newData);
          transactionSummary(getTableData('#transaction_table'));
          $('#editTransactionModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
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
  .getElementById('edit-payout-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-payout-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const uploadedFile = fileUploadInstance.getFile();

    let formData = new FormData();
    formData.append('user_id', getMyElement('input-payout-user-id').value);
    formData.append(
      'amount_paid',
      getMyElement('input-amount-to-pay-payout').value
    );
    formData.append('file_resource_payment_receipt_photo', uploadedFile);

    const options = {
      body: formData,
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/referrals_payment',
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
          updateTableDataById('#payout_table', data.newData);
          $('#editPayoutModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
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
  .getElementById('edit-user-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-user-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        user_id: getMyElement('input-user-user-id').value,
        role_id: getMyElement('input-select-user-role').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/user',
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
          updateTableDataById('#users_table', data.newData);
          $('#editUserModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
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
  .getElementById('currency-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#save-currency-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const allCurrency = [];
    currencyData.map((item) => {
      const currencyForm = document.getElementById(
        `${preId_currency}-${item.code}`
      );

      if (currencyForm?.value) {
        allCurrency.push({ code: item.code, value: currencyForm.value });
      }
    });

    const options = {
      body: JSON.stringify({
        currency_list: allCurrency,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/currency/update',
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
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('rate-and-fees-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#save-rate-and-fees-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const allRate = [];
    rateData.map((item) => {
      const rateForm = document.getElementById(`${preId_rate}-${item.code}`);
      if (rateForm?.value) {
        allRate.push({ code: item.code, value: rateForm.value });
      }
    });

    const allFee = [];
    feeData.map((item) => {
      const rateFee = document.getElementById(`${preId_fee}-${item.code}`);
      if (rateFee?.value) {
        allFee.push({ code: item.code, value: rateFee.value });
      }
    });

    const options = {
      body: JSON.stringify({
        rate_fee_list: allRate.concat(allFee),
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/rate_fee/update',
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

          setTimeout(function () {
            location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('add-career-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#add-career-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        title: getMyElement('input-add-career-title').value,
        description: getMyElement('input-add-career-description').value,
        type: getMyElement('input-add-career-type').value,
        location: getMyElement('input-add-career-location').value,
        tag: getMyElement('input-add-career-tag').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/add/career',
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
          addTableDataById('#career_table', data.newData);
          $('#addCareerModal').modal('hide');
          showToast('alert-toast-container', 'Added successfully!', 'success');
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('edit-career-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-career-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        career_id: getMyElement('input-edit-career-id').value,
        title: getMyElement('input-edit-career-title').value,
        description: getMyElement('input-edit-career-description').value,
        type: getMyElement('input-edit-career-type').value,
        location: getMyElement('input-edit-career-location').value,
        tag: getMyElement('input-edit-career-tag').value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/career/update',
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
          updateTableDataById('#career_table', data.newData);
          $('#editCareerModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
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
  .getElementById('edit-career-delete-btn')
  .addEventListener('click', function (e) {
    e.preventDefault();

    if (
      confirm(
        'Are you sure you want to delete this record? This action cannot be undone.'
      )
    ) {
    } else {
      return;
    }

    let useBtn = document.querySelector('#edit-career-delete-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const inputEditCareerId = getMyElement('input-edit-career-id').value;

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/delete/career/${inputEditCareerId}`,
      'DELETE',
      token
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          deleteTableData(
            '#career_table',
            getMyElement('input-edit-career-id').value
          );
          $('#editCareerModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Deleted successfully!',
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

function populateToFee() {
  const parentTable = document.getElementById('form-parent-fee');
  const child = document.getElementById('form-child-fee');
  const emptyDiv = [];

  if (feeData.length !== 0) {
    feeData.map((item) => {
      const card = child.cloneNode(true);
      const label = card.getElementsByTagName('label');
      const formInput = card.getElementsByTagName('input');
      label[0].innerHTML = `${item.name} ${
        item.value_type == 'percentage' ? '(%)' : ''
      }`;
      formInput[0].setAttribute('id', `${preId_fee}-${item.code}`);
      formInput[0].value = item.value;
      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    parentTable.classList.add('hidden');
  } else {
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function populateToRate() {
  const parentTable = document.getElementById('form-parent-rate');
  const child = document.getElementById('form-child-rate');
  const emptyDiv = [];

  if (rateData.length !== 0) {
    rateData.map((item) => {
      const card = child.cloneNode(true);
      const label = card.getElementsByTagName('label');
      const formInput = card.getElementsByTagName('input');
      label[0].innerHTML = `${item.name} ${
        item.value_type == 'percentage' ? '(%)' : ''
      }`;
      formInput[0].setAttribute('id', `${preId_rate}-${item.code}`);
      formInput[0].value = item.value;
      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    parentTable.classList.add('hidden');
  } else {
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function populateToCurrency() {
  const parentTable = document.getElementById('form-parent-currency');
  const child = document.getElementById('form-child-currency');
  const emptyDiv = [];

  if (currencyData.length !== 0) {
    currencyData.map((item) => {
      const card = child.cloneNode(true);
      const label = card.getElementsByTagName('label');
      const formInput = card.getElementsByTagName('input');
      label[0].innerHTML = `${item.name} (${item.short_name})`;
      formInput[0].setAttribute('id', `${preId_currency}-${item.code}`);
      formInput[0].value = item.value;
      emptyDiv.push(card);
    });
  }

  if (emptyDiv.length === 0) {
    parentTable.classList.add('hidden');
  } else {
    parentTable.classList.remove('hidden');

    while (parentTable.firstChild) {
      parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach((item) => {
      parentTable.appendChild(item);
    });
  }
}

function parcelSummary(tableData) {
  let totalWaiting = 0;
  tableData.map((item) => {
    if (item.parcel_status_data.code == 'waiting') {
      totalWaiting = totalWaiting + 1;
    }
  });

  const summaryContainer = document.getElementById('parcel-summary-container');
  const summaryBody = document.getElementById('parcel-summary-body');

  if (totalWaiting > 0) {
    let summaryText = `Action Required: <strong>${totalWaiting}</strong> items is on waiting status`;
    summaryBody.innerHTML = summaryText;
    summaryContainer.style.display = 'block';
  } else {
    summaryBody.innerHTML = '';
    summaryContainer.style.display = 'none';
  }
}

function shipmentSummary(tableData) {
  let totalPendingPrice = 0;
  let totalWaiting = 0;
  tableData.map((item) => {
    if (item?.shipment_price_data) {
    } else {
      totalPendingPrice = totalPendingPrice + 1;
    }
    if (item.shipping_status_data.code == 'waiting') {
      totalWaiting = totalWaiting + 1;
    }
  });

  const summaryContainer = document.getElementById(
    'shipping-summary-container'
  );
  const summaryBody = document.getElementById('shipping-summary-body');

  if (totalPendingPrice > 0 || totalWaiting > 0) {
    let summaryText = 'Action Required:';
    if (totalPendingPrice > 0) {
      summaryText += ` Pending Prices for <strong>${totalPendingPrice}</strong> items`;
    }
    if (totalWaiting > 0) {
      summaryText += ` ${
        totalPendingPrice > 0 ? ',' : ''
      } <strong>${totalWaiting}</strong> items is on waiting status`;
    }
    summaryBody.innerHTML = summaryText;
    summaryContainer.style.display = 'block';
  } else {
    summaryBody.innerHTML = '';
    summaryContainer.style.display = 'none';
  }
}

function transactionSummary(tableData) {
  let totalPending = 0;
  tableData.map((item) => {
    if (item?.topup_status_data) {
      if (item.topup_status_data.code == 'pending') {
        totalPending = totalPending + 1;
      }
    }
  });

  const summaryContainer = document.getElementById(
    'transaction-summary-container'
  );
  const summaryBody = document.getElementById('transaction-summary-body');

  if (totalPending > 0) {
    let summaryText = `Action Required: <strong>${totalPending}</strong> items is on pending status`;
    summaryBody.innerHTML = summaryText;
    summaryContainer.style.display = 'block';
  } else {
    summaryBody.innerHTML = '';
    summaryContainer.style.display = 'none';
  }
}

function populateToTableParcel(tableData) {
  const tableColumns = [
    {
      title:
        '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Parcel ID</label></div>',
      data: 'custom_id',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
              <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
              </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Tracking Number</label>',
      data: 'tracking_number',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Parcel Content</label>',
      data: 'content',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Remarks</label>',
      data: 'remarks',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${
          data ? data : '-'
        }</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Parcel Status</label>',
      data: 'parcel_status_data',
      render: function (data, type, row, meta) {
        data.code;
        if (data.code == 'waiting') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        }
        if (data.code == 'arrived') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-success">
              <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        }
        if (data.code == 'shipped') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
             <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        }
        if (data.code == 'consolidate') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
            <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        } else {
          return `<div class="datatable-item-container">-</div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Date Created</label>',
      data: 'created_at',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container" onclick="alert(${formatDate(
          data
        )})"><div class="datatable-item-title">${formatDate(data)}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title"></label>',
      data: 'id',
      orderable: false, // disable sorting for this column
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <button onclick="editParcel('${data}')" type="button" class="btn btn-light btn-sm atfal-secondary-btn">More</button>
        </div></div>`;
      },
    },
  ];

  populateToTable('#parcel_table', tableData, tableColumns, tableLoader);
  parcelSummary(getTableData('#parcel_table'));
}

function populateToTableShipment(tableData) {
  const tableColumns = [
    {
      title:
        '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Shipping ID</label></div>',
      data: 'custom_id',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
              <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
              </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Receiver Name</label>',
      data: 'name',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Parcel</label>',
      data: 'selected_parcel',
      render: function (data, type, row, meta) {
        const combineResult = data
          .map((item) => item?.parcel_data?.content)
          .join(', ');

        return `<div class="datatable-item-container"><div class="datatable-item-title">${combineResult}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Shipping Status</label>',
      data: 'shipping_status_data',
      render: function (data, type, row, meta) {
        data.code;
        if (data.code == 'waiting') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        }
        if (data.code == 'arrived') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        }
        if (data.code == 'shipped') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
             <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        }
        if (data.code == 'consolidate') {
          return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
            <span class="badge-text ml-1">${data.name}</span>
            </div>
          </div>
       `;
        } else {
          return `<div class="datatable-item-container">-</div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Date Created</label>',
      data: 'created_at',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container" onclick="alert(${formatDate(
          data
        )})"><div class="datatable-item-title">${formatDate(data)}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Price MYR</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.shipment_price_data) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.shipment_price_data.price_myr}</div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Fee (%)</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.shipment_price_data) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.shipment_price_data.fee_percentage}</div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Allow to pay</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.shipment_price_data) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${
            row?.shipment_price_data?.allow_payment == true ? 'Yes' : 'No'
          }</div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Payment Status</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.shipment_price_data) {
          if (row?.shipment_price_data?.payment_status_data) {
            //  <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="shipment-dashboard-check06">
            return `
              <div class="datatable-item-container">
                <div class="badge-rounded-${row?.shipment_price_data?.payment_status_data.theme}">
                  <span class="badge-text ml-1">${row?.shipment_price_data?.payment_status_data.name}</span>
                </div>
              </div>
           `;
          } else {
            return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">Pending</span>
            </div>
          </div>
       `;
          }
        } else {
          return `
            <div class="datatable-item-container">
              <div class="badge-rounded-info">
                <span class="badge-text ml-1">Pending</span>
              </div>
            </div>
         `;
        }
      },
    },
    // {
    //   title: '<label class="datatable-header-title">Cost List</label>',
    //   data: 'cost',
    //   render: function (data, type, row, meta) {
    //     let formattedItems = '';

    //     if (data && data.length > 0) {
    //       formattedItems = data
    //         .map((item, index) => {
    //           const valueText =
    //             item.value_type === 'percentage'
    //               ? `${item.value}%`
    //               : item.value;
    //           return `
    //                 <div class="item-container">
    //                     <div>${index + 1}. ${item.name} (${valueText})</div>
    //                 </div>`;
    //         })
    //         .join('');
    //     } else {
    //       formattedItems = '<div class="no-data-message">-</div>';
    //     }

    //     return `<div class="datatable-item-container"><div class="datatable-item-title">${formattedItems}</div></div>`;
    //   },
    // },
    {
      title: '<label class="datatable-header-title"></label>',
      data: 'id',
      orderable: false, // disable sorting for this column
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <button onclick="editShipment('${data}')" type="button" class="btn btn-light btn-sm atfal-secondary-btn">More</button>
        </div></div>`;
      },
    },
  ];

  populateToTable('#shipment_table', tableData, tableColumns, tableLoader2);
  shipmentSummary(getTableData('#shipment_table'));
}

function populateToTableTransaction(tableData) {
  const tableColumns = [
    {
      title:
        '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">ID Id</label></div>',
      data: 'custom_id',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
              <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
              </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Type</label>',
      data: 'category',
      render: function (data, type, row, meta) {
        let typeDetails = {
          alipay_topup: {
            name: 'Topup',
          },
          alipay_pob: {
            name: 'POB',
          },
        };

        return `<div class="datatable-item-container"><div class="datatable-item-title">${
          data ? typeDetails[data].name : '-'
        }</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Remarks</label>',
      data: 'remark',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${
          data ? data : '-'
        }</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Payment Status</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.topup_price_data) {
          if (row?.topup_price_data?.payment_status_data) {
            return `
              <div class="datatable-item-container">
                <div class="badge-rounded-${row?.topup_price_data?.payment_status_data.theme}">
                  <span class="badge-text ml-1">${row?.topup_price_data?.payment_status_data.name}</span>
                </div>
              </div>
           `;
          } else {
            return `
          <div class="datatable-item-container">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">Pending</span>
            </div>
          </div>
       `;
          }
        } else {
          return `
            <div class="datatable-item-container">
              <div class="badge-rounded-info">
                <span class="badge-text ml-1">Pending</span>
              </div>
            </div>
         `;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Date Created</label>',
      data: 'created_at',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container" onclick="alert(${formatDate(
          data
        )})"><div class="datatable-item-title">${formatDate(data)}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Price MYR</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.topup_price_data) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.topup_price_data.price_myr}</div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">Pending</span>
            </div>
          </div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Fee (%)</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.topup_price_data) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.topup_price_data.fee_percentage}</div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <div class="badge-rounded-info">
              <span class="badge-text ml-1">Pending</span>
            </div>
          </div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title">Status</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.topup_status_data) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
          <div class="badge-rounded-info"><span class="badge-text ml-1">${row.topup_status_data.name}</div></div></div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
              <span class="badge-text ml-1">-</span>
          </div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title"></label>',
      data: 'id',
      orderable: false, // disable sorting for this column
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <button onclick="editTransaction('${data}')" type="button" class="btn btn-light btn-sm atfal-secondary-btn">More</button>
        </div></div>`;
      },
    },
  ];

  populateToTable('#transaction_table', tableData, tableColumns, tableLoader3);
  transactionSummary(getTableData('#transaction_table'));
}

function populateToTablePayout(tableData) {
  const tableColumns = [
    {
      title: '<label class="datatable-header-title">User</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        defaultImage = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`;
        if (row.profile_image) {
          defaultImage = row.profile_image.url;
        }

        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <div class="d-flex" style="text-decoration: none">
          <img src="${defaultImage}" class="rounded-circle mr-2" style="width: 35px; height: 35px" alt="Avatar">
          <div class="form-label mr-2 row">
            <span>${row.username}</span>
            <span class="small">${row.email}</span>
          </div>
          </div>
        </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Members</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        var totalTeam = 0;
        if (row.referrals_of_user_data) {
          totalTeam = row.referrals_of_user_data.length;
        }
        return `<div class="datatable-item-container"><div class="datatable-item-title">${totalTeam}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Total Group Sales</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        let total = 0;

        row.referrals_of_user_data.forEach((item) => {
          total += item.shipment_price_of_user_data.reduce((acc, shipment) => {
            if (
              shipment.payment_status_id === 1 &&
              shipment.payout_payment_status_id !== 1
            ) {
              return acc + (parseFloat(shipment.price_myr) || 0);
            }
            return acc;
          }, 0);

          total += item.topup_price_of_user_data.reduce((acc, transaction) => {
            if (
              transaction.payment_status_id === 1 &&
              transaction.payout_payment_status_id !== 1
            ) {
              return acc + (parseFloat(transaction.price_myr) || 0);
            }
            return acc;
          }, 0);
        });

        return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${total.toFixed(
          2
        )}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Total Paid Payout</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        const totalPaid = row.referrals_payment_of_user_data.reduce(
          (acc, item) => acc + item.amount_paid,
          0
        );
        return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${totalPaid.toFixed(
          2
        )}</div></div>`;
      },
    },
    {
      title:
        '<label class="datatable-header-title">Total Pending Payout</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        var shipment_list = [];
        var transaction_list = [];
        var total_shipment = 0;
        var total_transaction = 0;
        var total = 0;
        var totalPaid = 0;

        if (row.referrals_of_user_data.length > 0) {
          row.referrals_of_user_data.map((item) => {
            if (item.shipment_price_of_user_data.length > 0) {
              item.shipment_price_of_user_data.map((item2) => {
                shipment_list.push(item2);
              });
            }

            if (item.topup_price_of_user_data.length > 0) {
              item.topup_price_of_user_data.map((item3) => {
                transaction_list.push(item3);
              });
            }
          });
        }

        shipment_list.map(function (item) {
          if (item.payment_status_id == 1) {
            var price = item.price_myr ? parseFloat(item.price_myr) : 0;
            var comm = item.payout_percentage
              ? parseFloat(item.payout_percentage)
              : 0;

            total_shipment = total_shipment + (comm / 100) * price;
          }
        });

        transaction_list.map(function (item) {
          if (item.payment_status_id == 1) {
            var price = item.price_myr ? parseFloat(item.price_myr) : 0;
            var comm = item.payout_percentage
              ? parseFloat(item.payout_percentage)
              : 0;

            total_transaction = total_transaction + (comm / 100) * price;
          }
        });

        total = total_shipment + total_transaction;

        if (row.referrals_payment_of_user_data.length !== 0) {
          row.referrals_payment_of_user_data.map((item) => {
            totalPaid = totalPaid + item.amount_paid;
          });
        }

        total = total - totalPaid;

        return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
          total.toFixed(2)
        ).toString()}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title"></label>',
      data: 'id',
      orderable: false, // disable sorting for this column
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <button onclick="editPayout('${data}')" type="button" class="btn btn-light btn-sm atfal-secondary-btn">More</button>
        </div></div>`;
      },
    },
  ];

  populateToTable('#payout_table', tableData, tableColumns, tableLoader4);
}

function populateToTableUsers(tableData) {
  const tableColumns = [
    {
      title: '<label class="datatable-header-title">User</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        defaultImage = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`;
        if (row.profile_image) {
          defaultImage = row.profile_image.url;
        }

        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <div class="d-flex" style="text-decoration: none">
          <img src="${defaultImage}" class="rounded-circle mr-2" style="width: 35px; height: 35px" alt="Avatar">
          <div class="form-label mr-2 row">
            <span>${row.username}</span>
            <span class="small">${row.email}</span>
          </div>
          </div>
        </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Role</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${row.role_data.name}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Email</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${row.email}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Phone Number</label>',
      data: 'id',
      render: function (data, type, row, meta) {
        if (row?.phone_number) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.phone_number}</div></div>`;
        } else {
          return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
        }
      },
    },
    {
      title: '<label class="datatable-header-title"></label>',
      data: 'id',
      orderable: false, // disable sorting for this column
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <button onclick="editUser('${data}')" type="button" class="btn btn-light btn-sm atfal-secondary-btn">More</button>
        </div></div>`;
      },
    },
  ];

  populateToTable('#users_table', tableData, tableColumns, tableLoader5);
}

function populateToTableCareer(tableData) {
  const tableColumns = [
    {
      title:
        '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Title</label></div>',
      data: 'title',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
              <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
              </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Description</label>',
      data: 'description',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Type</label>',
      data: 'type',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Location</label>',
      data: 'location',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Tag</label>',
      data: 'tag',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Applications</label>',
      data: 'application_url',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${row.applicant_of_career_data.length}</div></div>`;
      },
    },
    // {
    //   title: '<label class="datatable-header-title">Total Applicants</label>',
    //   data: 'id',
    //   render: function (data, type, row, meta) {
    //     return `<div class="datatable-item-container">
    //               <div class="datatable-item-title">
    //                 <a href="#" class="link-primary" onclick="viewApplicant('${data}')">
    //                   ${row.applicant_of_career_data.length}
    //                 </a>
    //               </div>
    //             </div>`;
    //   },
    // },
    {
      title: '<label class="datatable-header-title"></label>',
      data: 'id',
      orderable: false, // disable sorting for this column
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <button onclick="editCareer('${data}')" type="button" class="btn btn-light btn-sm atfal-secondary-btn">More</button>
        </div></div>`;
      },
    },
  ];

  populateToTable('#career_table', tableData, tableColumns, tableLoaderCareer);
}

function populateToTableApplication(tableData) {
  const tableColumns = [
    {
      title:
        '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Full Name</label></div>',
      data: 'name',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
              <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
              </div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Phone Number</label>',
      data: 'phone_number',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Email</label>',
      data: 'email',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">About Me</label>',
      data: 'about_me',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Linkin Profile Url</label>',
      data: 'linkin_profile_url',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Apply For</label>',
      data: 'career_data.title',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
      },
    },
  ];

  populateToTable(
    '#career_application_table',
    tableData,
    tableColumns,
    tableLoaderCareerApplication
  );
}

function firstFetch() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/master',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        currencyData = data.currency_list;
        feeData = data.fee_list;
        rateData = data.rate_list;

        populateToTableParcel(data.parcel_list);
        populateToTableShipment(data.shipment_list);
        populateToTableTransaction(data.transaction_list);
        populateToTablePayout(data.referral_list);
        populateToTableUsers(data.user_list);
        populateToTableCareer(data.career_list);
        populateToTableApplication(data.applicant_list);

        populateToFee();
        populateToRate();

        populateToCurrency();

        data.fee_list.map((item) => {
          if (item.type == 'fee' && item.code == 'sf') {
            shipmentFreeDefaultValue = item.value;
          }
        });

        data.role_list.unshift({ id: '', name: 'Please Select' });
        data.role_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          getMyElement('input-select-user-role').appendChild(optionElement);
        });

        data.parcel_status_list.unshift({ id: '', name: 'Please Select' });
        data.parcel_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          getMyElement('input-select-parcel-status').appendChild(optionElement);
        });

        data.transaction_status_list.unshift({ id: '', name: 'Please Select' });
        data.transaction_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          getMyElement('input-select-transaction-status').appendChild(
            optionElement
          );
        });

        data.shipping_status_list.unshift({ id: '', name: 'Please Select' });
        data.shipping_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          getMyElement('input-select-shipment-status').appendChild(
            optionElement
          );
        });

        [
          { id: '', name: 'Please Select' },
          { id: 'true', name: 'Yes' },
          { id: 'false', name: 'No' },
        ].forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          getMyElement('input-select-allow-to-pay').appendChild(optionElement);
        });
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      tableLoader2.style.display = 'none';
      console.log('error', error);
    });
}

firstFetch();
