// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'affiliates',
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
  { text: 'Team', url: 'affiliates-dashboard.html', isActive: true },
];
generateBreadcrumb(breadcrumbData);

let tabs = [];
var defaultTab = document.getElementById('my-team-tab');
defaultTab.classList.add('show', 'active');
tabs.push(
  {
    id: 'my-team-tab-content',
    title: 'My Team',
    content: 'my-team-tab',
  },
  {
    id: 'payout-history-tab-content',
    title: 'Payout History',
    content: 'payout-history-tab',
  },
  {
    id: 'settings-team-tab-content',
    title: 'Settings',
    content: 'settings-team-tab',
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

const tableLoaderTeam = document.getElementById('table-loader-team');
const tableLoaderPayoutHistory = document.getElementById(
  'table-loader-payout-history'
);

function viewDetails(id, button) {
  const affiliateModalProfileImage = document.getElementById(
    'affiliate-modal-profile-image'
  );
  const affiliateModalUsername = document.getElementById(
    'affiliate-modal-username'
  );
  const affiliateModalCreatedAt = document.getElementById(
    'affiliate-modal-created-at'
  );
  const shipmentTotalSales = document.getElementById('shipment-total-sales');
  const shipmentTotalPayout = document.getElementById('shipment-total-payout');
  const transactionTotalSales = document.getElementById(
    'transaction-total-sales'
  );
  const transactionTotalPayout = document.getElementById(
    'transaction-total-payout'
  );
  const gradTotalSales = document.getElementById('grand-total-sales');
  const gradTotalPayout = document.getElementById('grand-total-payout');

  var foundObject = getTableData('#team_table').find(function (obj) {
    return obj.id.toString() === id.toString();
  });

  const defaultUserImageUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

  if (foundObject) {
    if (foundObject.user_data?.profile_image) {
      affiliateModalProfileImage.src = foundObject.user_data?.profile_image.url;
    } else {
      affiliateModalProfileImage.src = defaultUserImageUrl;
    }

    affiliateModalUsername.innerHTML = foundObject.user_data.username;
    affiliateModalCreatedAt.innerHTML = formatDate(foundObject.created_at);

    var grand_total_sales = 0;
    var grand_total_payout = 0;

    if (foundObject.user_data.shipment_price_of_user_data.length !== 0) {
      var total_sales = 0;
      var total_comm = 0;

      foundObject.user_data.shipment_price_of_user_data.map(function (item) {
        if (
          item.payment_status_id == 1 &&
          item.payout_payment_status_id !== 1
        ) {
          var price = item.price_myr ? parseFloat(item.price_myr) : 0;
          var comm = item.payout_percentage
            ? parseFloat(item.payout_percentage)
            : 0;

          total_sales = total_sales + price;
          total_comm = total_comm + (comm / 100) * price;
        }
      });

      grand_total_sales = grand_total_sales + total_sales;
      grand_total_payout = grand_total_payout + total_comm;
      shipmentTotalSales.innerHTML = `RM ${parseFloat(
        total_sales.toFixed(2)
      ).toString()}`;
      shipmentTotalPayout.innerHTML = `RM ${parseFloat(
        total_comm.toFixed(2)
      ).toString()}`;
    } else {
      shipmentTotalSales.innerHTML = `-`;
      shipmentTotalPayout.innerHTML = `-`;
    }

    if (foundObject.user_data.topup_price_of_user_data.length !== 0) {
      var total_sales = 0;
      var total_comm = 0;

      foundObject.user_data.topup_price_of_user_data.map(function (item) {
        if (
          item.payment_status_id == 1 &&
          item.payout_payment_status_id !== 1
        ) {
          var price = item.price_myr ? parseFloat(item.price_myr) : 0;
          var comm = item.payout_percentage
            ? parseFloat(item.payout_percentage)
            : 0;

          total_sales = total_sales + price;
          total_comm = total_comm + (comm / 100) * price;
        }
      });

      grand_total_sales = grand_total_sales + total_sales;
      grand_total_payout = grand_total_payout + total_comm;

      transactionTotalSales.innerHTML = `RM ${parseFloat(
        total_sales.toFixed(2)
      ).toString()}`;
      transactionTotalPayout.innerHTML = `RM ${parseFloat(
        total_comm.toFixed(2)
      ).toString()}`;
    } else {
      transactionTotalSales.innerHTML = `-`;
      transactionTotalPayout.innerHTML = `-`;
    }

    gradTotalSales.innerHTML = `RM ${parseFloat(
      grand_total_sales.toFixed(2)
    ).toString()}`;
    gradTotalPayout.innerHTML = `RM ${parseFloat(
      grand_total_payout.toFixed(2)
    ).toString()}`;
  } else {
    affiliateModalProfileImage.src = defaultUserImageUrl;
    affiliateModalUsername.innerHTML = `-`;
    affiliateModalCreatedAt.innerHTML = `-`;
    shipmentTotalSales.innerHTML = `-`;
    shipmentTotalPayout.innerHTML = `-`;
    gradTotalSales.innerHTML = `-`;
    gradTotalPayout.innerHTML = `-`;
  }

  $('#affiliateModal').modal('show');
}

function populateToTableTeam(tableData) {
  const tableColumns = [
    {
      title: '<label class="datatable-header-title">Members</label>',
      data: 'user_data',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">
          <div class="d-flex" style="text-decoration: none">
          <img src="${
            data.profile_image
              ? data.profile_image?.url
              : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`
          }" class="rounded-circle mr-2" style="width: 35px; height: 35px" alt="Avatar">
          <div class="form-label mr-2 row">
            <span>${data.username}</span>
            <span class="small">${data.email}</span>
          </div>
          </div>
        </div></div>`;
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
      title: '<label class="datatable-header-title">Total Sales</label>',
      data: 'user_data',
      render: function (data, type, row, meta) {
        let total = 0;

        total += data.shipment_price_of_user_data.reduce((acc, shipment) => {
          if (
            shipment.payment_status_id === 1 &&
            shipment.payout_payment_status_id !== 1
          ) {
            return acc + (parseFloat(shipment.price_myr) || 0);
          }
          return acc;
        }, 0);

        total += data.topup_price_of_user_data.reduce((acc, transaction) => {
          if (
            transaction.payment_status_id === 1 &&
            transaction.payout_payment_status_id !== 1
          ) {
            return acc + (parseFloat(transaction.price_myr) || 0);
          }
          return acc;
        }, 0);

        return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${total.toFixed(
          2
        )}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Total Payout</label>',
      data: 'user_data',
      render: function (data, type, row, meta) {
        if (data.topup_price_of_user_data.length !== 0) {
          var total_payout_shipment = 0;
          var total_payout_transaction = 0;
          var totalPayout = 0;

          data.shipment_price_of_user_data.map(function (item) {
            if (
              item.payment_status_id == 1 &&
              item.payout_payment_status_id !== 1
            ) {
              var price = item.price_myr ? parseFloat(item.price_myr) : 0;
              var comm = item.payout_percentage
                ? parseFloat(item.payout_percentage)
                : 0;

              total_payout_shipment =
                total_payout_shipment + (comm / 100) * price;
            }
          });

          data.topup_price_of_user_data.map(function (item) {
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

          return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
            totalPayout.toFixed(2)
          ).toString()}</div></div>`;
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
          <button onclick="viewDetails('${data}', this)" type="button" class="btn btn-light btn-sm atfal-secondary-btn">View</button>
        </div></div>`;
      },
    },
  ];

  // var buttonDownloadCSV = document.getElementById('button-download-csv');
  // buttonDownloadCSV.addEventListener('click', function () {
  //   table.button('.buttons-csv').trigger();
  // });

  populateToTable(
    '#team_table',
    tableData,
    tableColumns,
    tableLoaderTeam,
    'button-download-csv'
  );
}

function populateToTablePayoutHistory(tableData) {
  const tableColumns = [
    {
      title: '<label class="datatable-header-title">Payment Date</label>',
      data: 'created_at',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">${formatDate(
          data
        )}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Paid Amount</label>',
      data: 'amount_paid',
      render: function (data, type, row, meta) {
        return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
          data.toFixed(2)
        ).toString()}</div></div>`;
      },
    },
    {
      title: '<label class="datatable-header-title">Receipt</label>',
      data: 'payment_receipt',
      orderable: false,
      render: function (data, type, row, meta) {
        if (data) {
          return `<div class="datatable-item-container">
                    <div class="datatable-item-title">
                      <a href="${data.url}" target="_blank" class="btn btn-light btn-sm atfal-secondary-btn">View</a>
                    </div>
                  </div>`;
        } else {
          return ''; // If data is empty, return an empty string
        }
      },
    },
  ];

  populateToTable(
    '#payout_history_table',
    tableData,
    tableColumns,
    tableLoaderPayoutHistory
  );
}

function firstFetch() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/referrals',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        tableLoaderTeam.style.display = 'none';
        tableLoaderPayoutHistory.style.display = 'none';
      } else {
        populateToTableTeam(data.referral_list);
        populateToTablePayoutHistory(data.payout_history_list);

        document.getElementById('input-affiliate-code').value =
          data.affiliate_list.code;
        document
          .getElementById('copy-affiliates-code-btn')
          .addEventListener('click', function () {
            navigator.clipboard
              .writeText(data.affiliate_list.code)
              .then(() => {
                showToast('alert-toast-container', 'Code copied!', 'success');
              })
              .catch((error) => {
                console.error('Failed to copy: ', error);
              });
          });
      }
    })
    .catch((error) => {
      tableLoaderTeam.style.display = 'none';
      tableLoaderPayoutHistory.style.display = 'none';
      console.log('error', error);
    });
}

firstFetch();
