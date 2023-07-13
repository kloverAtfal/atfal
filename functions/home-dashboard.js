// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'home',
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

var ctx = document.getElementById('examChart').getContext('2d');

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

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Commission',
      data: [20, 35, 45, 47, 35, 54, 62, 55, 72, 80, 84, 90],
      fill: false,
      borderColor: 'rgba(238,191,8,255)',
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
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  },
};
var myChart = new Chart(ctx, config);

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
        document.getElementById('total-parcel').innerHTML = data.total_parcel;
        document.getElementById('total-shipment').innerHTML =
          data.total_shipment;
        document.getElementById('total-topup').innerHTML = data.total_topup;
        document.getElementById('total-pending-parcel').innerHTML =
          data.pending_parcel_list.length;
        document.getElementById('date-range-pending-parcel').innerHTML =
          formatDateRange(data.pending_parcel_list);
        document.getElementById('date-range-pending-shipment').innerHTML =
          formatDateRange(data.pending_shipment_list);
        document.getElementById('date-range-pending-topup').innerHTML =
          formatDateRange(data.pending_topup_list);
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

getDashboardData();
