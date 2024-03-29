// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'home',
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
    isActive: true,
  },
];
generateBreadcrumb(breadcrumbData);

document.getElementById('welcome-username').innerHTML = myData?.userData
  .username
  ? `Welcome back, ${myData.userData.username}`
  : `-`;

document
  .getElementById('create-parcel-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'parcel-dashboard.html?code=new';
  });

document
  .getElementById('all-parcel-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'parcel-dashboard.html';
  });

document
  .getElementById('create-shipment-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'shipment-add-new.html';
  });

document
  .getElementById('all-shipment-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'shipment-dashboard.html';
  });

document
  .getElementById('create-topup-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'transaction-add-new.html';
  });

document
  .getElementById('all-topup-shorcut')
  .addEventListener('click', function (e) {
    location.href = 'transaction-dashboard.html';
  });

function populateToChart(passData) {
  const ctx = document.getElementById('examChart').getContext('2d');

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const parcelCounts = Array.from({ length: 12 }, () => 0);
  const shipmentCounts = Array.from({ length: 12 }, () => 0);
  const topupCounts = Array.from({ length: 12 }, () => 0);

  passData.parcel_list.forEach((item) => {
    const monthIndex = new Date(item.created_at).getMonth();
    parcelCounts[monthIndex]++;
  });

  passData.shipment_list.forEach((item) => {
    const monthIndex = new Date(item.created_at).getMonth();
    shipmentCounts[monthIndex]++;
  });

  passData.topup_list.forEach((item) => {
    const monthIndex = new Date(item.created_at).getMonth();
    topupCounts[monthIndex]++;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Parcel',
        data: parcelCounts,
        fill: false,
        borderColor: '#FADD66',
        tension: 0.1,
      },
      {
        label: 'Shipment',
        data: shipmentCounts,
        fill: false,
        borderColor: '#F7C600',
        tension: 0.1,
      },
      {
        label: 'Transaction',
        data: topupCounts,
        fill: false,
        borderColor: '#DEB200',
        tension: 0.1,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const datasetLabel = context.dataset.label;
              const dataPoint = context.parsed.y;
              return `${datasetLabel}: ${dataPoint}`;
            },
          },
        },
      },
    },
  };

  const myChart = new Chart(ctx, config);
}

const totalPayoutText = document.getElementById('total-payout-text');

function getTotalPayout(data) {
  data.map((refItem) => {
    refItem = refItem.user_data;
    if (refItem.topup_price_of_user_data.length !== 0) {
      var total_payout_shipment = 0;
      var total_payout_transaction = 0;
      var totalPayout = 0;

      refItem.shipment_price_of_user_data.map(function (item) {
        if (
          item.payment_status_id == 1 &&
          item.payout_payment_status_id !== 1
        ) {
          var price = item.price_myr ? parseFloat(item.price_myr) : 0;
          var comm = item.payout_percentage
            ? parseFloat(item.payout_percentage)
            : 0;

          total_payout_shipment = total_payout_shipment + (comm / 100) * price;
        }
      });

      refItem.topup_price_of_user_data.map(function (item) {
        if (
          item.payment_status_id == 1 &&
          item.payout_payment_status_id !== 1
        ) {
          var price = item.price_myr ? parseFloat(item.price_myr) : 0;
          var comm = item.payout_percentage
            ? parseFloat(item.payout_percentage)
            : 0;

          total_payout_transaction =
            total_payout_transaction + (comm / 100) * price;
        }
      });

      totalPayout = total_payout_shipment + total_payout_transaction;
      totalPayoutText.innerHTML = `RM ${parseFloat(
        totalPayout.toFixed(2)
      ).toString()}`;
    }
  });
}

function getDashboardData() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/dashboard',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        let totalParcel = 0;
        let totalShipment = 0;
        let totalTopup = 0;

        let waitingParcel = [];
        let waitingShipment = [];
        let waitingTopup = [];

        data.parcel_list.map((item) => {
          totalParcel = totalParcel + 1;
          if (item.parcel_status_id == 1) {
            waitingParcel.push(item);
          }
        });

        data.shipment_list.map((item) => {
          totalShipment = totalShipment + 1;
          if (item.shipping_status_id == 1) {
            waitingShipment.push(item);
          }
        });

        data.topup_list.map((item) => {
          totalTopup = totalTopup + 1;
          if (item.payment_status_id == 5) {
            waitingTopup.push(item);
          }
        });

        getTotalPayout(data.referral_list);

        document.getElementById('total-parcel').innerHTML = totalParcel;
        document.getElementById('total-shipment').innerHTML = totalShipment;
        document.getElementById('total-topup').innerHTML = totalTopup;

        document.getElementById('total-pending-parcel').innerHTML =
          waitingParcel.length;
        document.getElementById('total-pending-shipment').innerHTML =
          waitingShipment.length;
        document.getElementById('total-pending-topup').innerHTML =
          waitingTopup.length;

        document.getElementById('date-range-pending-parcel').innerHTML =
          formatDateRange(waitingParcel);
        document.getElementById('date-range-pending-shipment').innerHTML =
          formatDateRange(waitingShipment);
        document.getElementById('date-range-pending-topup').innerHTML =
          formatDateRange(waitingTopup);

        populateToChart(data);
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

getDashboardData();
