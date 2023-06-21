if (!token) {
  location.href = 'index';
}

var textPaymentStatus = document.getElementById('text-payment-status');
var textCountdown = document.getElementById('text-countdown');

function redirectFunction() {
  textPaymentStatus.innerHTML =
    'Thank you for your purchase. Redirecting to shipment dashboard in ';

  var seconds = 5;
  textCountdown.textContent = seconds + ' seconds';
  var redirectTimer = setInterval(function () {
    seconds--;
    textCountdown.textContent = seconds + ' seconds';
    if (seconds <= 0) {
      clearInterval(redirectTimer);
      window.open(
        'https://atfals-site.webflow.io/version-02/shipments',
        '_self'
      );
      location.href = 'shipment-dashboard';
    }
  }, 1000);
}

function updatePaymentStatus(status_id, order_id, bill_code) {
  const options = {
    body: JSON.stringify({
      status_id: status_id,
      order_id: order_id,
      bill_code: bill_code,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment/update/payment`,
    'POST',
    token,
    options
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        if (status_id == 1) {
          redirectFunction();
        } else if (status_id == 2) {
          textPaymentStatus.innerHTML = 'Pending';
        } else if (status_id == 3) {
          textPaymentStatus.innerHTML = 'Fail';
        } else {
          textPaymentStatus.innerHTML =
            'Something went wrong, please reload page.';
        }
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

window.onload = function () {
  var curUrl = new URL(document.location.href);
  var status_id = curUrl.searchParams.get('status_id');
  var order_id = curUrl.searchParams.get('order_id');
  var bill_code = curUrl.searchParams.get('billcode');

  if (status_id && order_id && bill_code) {
    updatePaymentStatus(status_id, order_id, bill_code);
  } else {
    textPaymentStatus.innerHTML = 'Something went wrong.';
  }
};
