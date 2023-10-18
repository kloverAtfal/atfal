// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'transaction',
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

var selectTypeId = 'alipay_topup';

function populateTransactionCard() {
  const parentTable = document.getElementById('transaction-type-list-parent');
  const style = document.getElementById('transaction-type-list-child');
  const emptyDiv = [];

  [
    {
      title: 'Alipay TopUp',
      description: 'Easy Alipay top-ups with our help',
      icon: 'public/external/creditcardplusi131-olzb.svg',
      id: 'alipay_topup',
    },
    {
      title: 'Alipay Pay On Behalf (POB)',
      description: 'let us handle your Alipay payment',
      icon: 'public/external/coinshandi131-qlyc.svg',
      id: 'alipay_pob',
    },
  ].forEach(function (item, index) {
    const card = style.cloneNode(true);
    const divs = card.getElementsByTagName('div');
    const iconImage = card.getElementsByTagName('img');
    iconImage[0].src = item.icon;
    const text = card.getElementsByTagName('span');
    text[0].innerHTML = item.title;
    text[1].innerHTML = item.description;

    if (item.id == selectTypeId) {
      divs[0].classList.add('selected-card');
      iconImage[1].src = 'public/external/checkbox-true-icon.svg';
      toggleAccountContainer();
    } else {
      divs[0].classList.remove('selected-card');
      iconImage[1].src = 'public/external/checkbox-false-icon.svg';
      toggleAccountContainer();
    }

    if (index > 0) {
      card.classList.add('mt-2');
    }

    divs[0].addEventListener('click', function () {
      selectTypeId = item.id;
      populateTransactionCard();
    });

    emptyDiv.push(card);
  });

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

function toggleAccountContainer() {
  accountCard = document.getElementById('account-container');
  nameCard = document.getElementById('name-container');
  alipayIdCard = document.getElementById('alipay-id-container');
  paymentLinkCard = document.getElementById('payment-link-cantainer');

  if (selectTypeId == 'alipay_topup') {
    accountCard.classList.add('hidden');
    nameCard.classList.remove('hidden');
    alipayIdCard.classList.remove('hidden');
    paymentLinkCard.classList.add('hidden');
  }
  if (selectTypeId == 'alipay_pob') {
    accountCard.classList.remove('hidden');
    nameCard.classList.add('hidden');
    alipayIdCard.classList.add('hidden');
    paymentLinkCard.classList.remove('hidden');
  }
}

const paymentLink = 'a2becfa8';

const inputName = document.getElementById('input-name');
const inputAlipayId = document.getElementById('input-alipay-id');
const inputRemark = document.getElementById('input-remark');
const inputRequestAmount = document.getElementById('input-request-amount');

const useCurrencyLongName = document.getElementById('use-currency-long-name');
const useCurrencyShortName = document.getElementById('use-currency-short-name');
const currencyConvertion = document.getElementById('request-amount-convertion');
var useCurrency = null;

document.getElementById('input-payment-link').value = paymentLink;

document
  .getElementById('copy-payment-link-btn')
  .addEventListener('click', function () {
    navigator.clipboard
      .writeText(paymentLink)
      .then(() => {
        showToast('alert-toast-container', 'Link copied!', 'success');
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  });

inputRequestAmount.addEventListener('input', function () {
  if (useCurrency.value > 0) {
    currencyConvertion.innerHTML = `...`;
    clearTimeout(this.timerId);
    let convResult = inputRequestAmount.value * useCurrency.value;
    this.timerId = setTimeout(() => {
      currencyConvertion.innerHTML = `= RM ${parseFloat(
        convResult.toFixed(2)
      ).toString()}`;
    }, 1000);
  }
});

function makePayment(id, button) {
  let useBtn = button;
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  const options = {
    body: JSON.stringify({
      topup_price_id: id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/top_up/price/pay`,
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
        if (data?.paymentResult?.status == 'error') {
          showToast('alert-toast-container', data.paymentResult.msg, 'danger');
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
      }
    })
    .catch((error) => {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      console.log('error', error);
    });
}

document
  .getElementById('payment-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    if (!selectTypeId) {
      showToast(
        'alert-toast-container',
        'Please select type of transaction',
        'danger'
      );
      return;
    }

    let useBtn = document.querySelector('#submit-checkout-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const requiredInputs = {
      alipay_topup: [
        { id: inputRequestAmount, message: 'Total Amount to Pay is required.' },
        { id: inputAlipayId, message: 'Alipay ID is required.' },
        { id: inputName, message: 'Name is required.' },
      ],
      alipay_pob: [
        { id: inputRequestAmount, message: 'Total Amount to Pay is required.' },
      ],
    };

    let isValid = true;
    const currentRequiredInputs = requiredInputs[selectTypeId];

    currentRequiredInputs.forEach((input) => {
      if (!input.id.value) {
        showToast('alert-toast-container', input.message, 'danger');
        isValid = false;
        return;
      }
    });

    if (isValid) {
      // proceed
    } else {
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
      return;
    }

    const options = {
      body: JSON.stringify({
        category: selectTypeId,
        account_name: inputName.value,
        alipay_id: inputAlipayId.value,
        request_amount: inputRequestAmount.value,
        remark: inputRemark.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/top_up',
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

          const orderId = document.getElementById('text-order-id');
          const totalBig = document.getElementById('text-total-big');
          const transaction = document.getElementById('text-transaction');
          const fees = document.getElementById('text-fees');
          const total = document.getElementById('text-total');

          data = data.latest_price;
          var price1 = data.price_myr ? parseFloat(data.price_myr) : 0;
          var price2 = data.fee_percentage
            ? parseFloat(data.fee_percentage)
            : 0;

          const fee_price = (price2 / 100) * price1;
          const formattedTotal = price1 + fee_price;

          orderId.innerHTML = `Pay for transaction: ${data.top_up_data.custom_id}`;
          totalBig.innerHTML = `RM ${parseFloat(
            formattedTotal.toFixed(2)
          ).toString()}`;
          transaction.innerHTML = `RM ${parseFloat(
            price1.toFixed(2)
          ).toString()}`;
          fees.innerHTML = `RM ${parseFloat(fee_price.toFixed(2)).toString()}`;
          total.innerHTML = `RM ${parseFloat(
            formattedTotal.toFixed(2)
          ).toString()}`;

          const checkOutBtn = document.getElementById('check-out-btn');
          checkOutBtn.addEventListener('click', function (e) {
            makePayment(data.id, this);
          });

          $('#payModal').modal('show');
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function getTransactionDropdownData() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/top_up/dropdown',
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        useCurrency = data.use_currency;
        useCurrencyLongName.innerHTML = data.use_currency.name;
        useCurrencyShortName.innerHTML = data.use_currency.short_name;
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

function firstCall() {
  populateTransactionCard();
  getTransactionDropdownData();
}

firstCall();
