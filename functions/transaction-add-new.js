// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'transaction',
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

var selectTypeId = 'topup';

function populateTransactionCard() {
  const parentTable = document.getElementById('transaction-type-list-parent');
  const style = document.getElementById('transaction-type-list-child');
  const emptyDiv = [];

  [
    {
      title: 'Alipay TopUp',
      description: 'Easy Alipay top-ups with our help',
      icon: 'public/external/creditcardplusi131-olzb.svg',
      id: 'topup',
    },
    {
      title: 'Alipay Pay On Behalf (POB)',
      description: 'let us handle your Alipay payment',
      icon: 'public/external/coinshandi131-qlyc.svg',
      id: 'pob',
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
      iconImage[1].src = 'public/external/checkcirclei5287-wqq.svg';
      toggleAccountContainer();
    } else {
      divs[0].classList.remove('selected-card');
      iconImage[1].src = 'public/external/arrowdowni131-alv.svg';
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

  if (selectTypeId == 1) {
    accountCard.classList.add('hidden');
  } else {
    accountCard.classList.remove('hidden');
  }
}

const alipayId = 'a2becfa8';

document.getElementById('input-alipay-id').value = alipayId;

document
  .getElementById('copy-alipay-id-btn')
  .addEventListener('click', function () {
    navigator.clipboard
      .writeText(alipayId)
      .then(() => {
        showToast('alert-toast-container', 'Id copied!', 'success');
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  });

const inputName = document.getElementById('input-name');
const inputRemark = document.getElementById('input-remark');
const inputRequestAmount = document.getElementById('input-request-amount');
// const inputSelectCurrency = document.getElementById('input-select-currency');

const checkoutTitle = document.getElementById('check-out-title');
var custom_id_to_pay = null;

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

    const options = {
      body: JSON.stringify({
        type: selectTypeId,
        name: inputName.value,
        remark: inputRemark.value,
        request_amount: inputRequestAmount.value,
        // currency_id: inputSelectCurrency.value,
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

          const subtotalBig = document.getElementById('text-subtotal-big');
          const subtotal = document.getElementById('text-subtotal');
          const fees = document.getElementById('text-fees');
          const total = document.getElementById('text-total');

          subtotalBig.innerHTML = `RM ${data.subtotal}`;
          subtotal.innerHTML = `RM ${data.subtotal}`;
          fees.innerHTML = `RM ${data.fees}`;
          console.log(data.subtotal, data.fees);
          total.innerHTML = `RM ${Number(data.subtotal) + Number(data.fees)}`;
          $('#payModal').modal('show');
          checkoutTitle.innerHTML = `Order Id: ${data.custom_id}`;
          custom_id_to_pay = data.custom_id;
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('check-out-btn')
  .addEventListener('click', function (e) {
    let useBtn = document.getElementById('check-out-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        topup_custom_id: custom_id_to_pay,
      }),
    };

    fetchAPI(
      `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/payment/top_pup`,
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
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
      })
      .catch((error) => {
        console.log('error', error);
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
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
        data.currency.unshift({ id: '', short_name: 'Please Select' });
        // data.currency.forEach((item) => {
        //   const optionElement = document.createElement('option');
        //   optionElement.value = item.id;
        //   optionElement.text = item.short_name;
        //   inputSelectCurrency.appendChild(optionElement);
        // });
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
