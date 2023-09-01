// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'affiliates',
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

const tableLoader = document.getElementById('table-loader');

let tableData = [];

function populateToTable(data) {
  // updateTotals(data);

  // initialize Datatables with your table and column definitions
  const table = $('#example').DataTable({
    data: tableData,
    columns: [
      {
        title: '<label class="datatable-header-title">Members</label>',
        data: 'user_data',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <div class="d-flex" style="text-decoration: none">
            <img src="${
              data.profile_image
                ? data.profile_image.url
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
          )})"><div class="datatable-item-title">${formatDate(
            data
          )}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Shipment</label>',
        data: 'user_data',
        render: function (data, type, row, meta) {
          if (data.shipment_price_of_user_data.length !== 0) {
            var total_shipment = 0;

            data.shipment_price_of_user_data.map(function (item) {
              if (
                item.payment_status_id == 1 &&
                item.payout_payment_status_id !== 1
              ) {
                total_shipment = total_shipment + 1;
              }
            });

            return `<div class="datatable-item-container"><div class="datatable-item-title">${total_shipment}</div></div>`;
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
          }
        },
      },
      {
        title:
          '<label class="datatable-header-title">Shipment Commission</label>',
        data: 'user_data',
        render: function (data, type, row, meta) {
          if (data.shipment_price_of_user_data.length !== 0) {
            var total_comm = 0;

            data.shipment_price_of_user_data.map(function (item) {
              if (
                item.payment_status_id == 1 &&
                item.payout_payment_status_id !== 1
              ) {
                var price = item.price_myr ? parseFloat(item.price_myr) : 0;
                var comm = item.payout_percentage
                  ? parseFloat(item.payout_percentage)
                  : 0;

                total_comm = total_comm + (comm / 100) * price;
              }
            });

            return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
              total_comm.toFixed(2)
            ).toString()}</div></div>`;
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
          }
        },
      },
      {
        title: '<label class="datatable-header-title">Transaction</label>',
        data: 'user_data',
        render: function (data, type, row, meta) {
          if (data.topup_price_of_user_data.length !== 0) {
            var total_topup = 0;

            data.topup_price_of_user_data.map(function (item) {
              if (
                item.payment_status_id == 1 &&
                item.payout_payment_status_id !== 1
              ) {
                total_topup = total_topup + 1;
              }
            });

            return `<div class="datatable-item-container"><div class="datatable-item-title">${total_topup}</div></div>`;
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
          }
        },
      },
      {
        title:
          '<label class="datatable-header-title">Transaction Commission</label>',
        data: 'user_data',
        render: function (data, type, row, meta) {
          if (data.topup_price_of_user_data.length !== 0) {
            var total_comm = 0;

            data.topup_price_of_user_data.map(function (item) {
              if (
                item.payment_status_id == 1 &&
                item.payout_payment_status_id !== 1
              ) {
                var price = item.price_myr ? parseFloat(item.price_myr) : 0;
                var comm = item.payout_percentage
                  ? parseFloat(item.payout_percentage)
                  : 0;

                total_comm = total_comm + (comm / 100) * price;
              }
            });

            return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
              total_comm.toFixed(2)
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
    ],
    lengthChange: false,
    buttons: [
      {
        extend: 'csv',
        //   split: ["pdf", "excel"],
      },
    ],
    drawCallback: function () {
      tableLoader.style.display = 'none';
    },
  });

  // table
  //   .buttons()
  //   .container()
  //   .appendTo("#example_wrapper .col-md-6:eq(0)");

  var buttonDownloadCSV = document.getElementById('button-download-csv');
  buttonDownloadCSV.addEventListener('click', function () {
    table.button('.buttons-csv').trigger();
  });

  let checkedRows = [];

  // Add click event handler for checkAll checkbox
  $('#checkAll').on('click', function () {
    const isChecked = $(this).prop('checked');
    if (isChecked) {
      // Set checked attribute and push data for all checkboxes with id="checkItem"
      table
        .rows()
        .nodes()
        .each(function (row) {
          const checkbox = $(row).find("input[type='checkbox']");
          if (checkbox.attr('id') === 'checkItem') {
            checkbox.prop('checked', true);
            const rowData = table.row(row).data();
            if (!isCheckedRow(rowData)) {
              checkedRows.push(rowData);
            }
          }
        });
    } else {
      // Remove checked attribute and remove data for all checkboxes with id="checkItem"
      table
        .rows()
        .nodes()
        .each(function (row) {
          const checkbox = $(row).find("input[type='checkbox']");
          if (checkbox.attr('id') === 'checkItem') {
            checkbox.prop('checked', false);
            const rowData = table.row(row).data();
            const index = checkedRows.findIndex(
              (item) => item.id === rowData.id
            );
            if (index >= 0) {
              checkedRows.splice(index, 1);
            }
          }
        });
    }
  });

  // Add click event handler for individual checkboxes
  $(document).on('click', '#checkItem', function () {
    const rowData = table.row($(this).closest('tr')).data();
    if ($(this).prop('checked')) {
      if (!isCheckedRow(rowData)) {
        checkedRows.push(rowData);
      }
    } else {
      const index = checkedRows.findIndex((item) => item.id === rowData.id);
      if (index >= 0) {
        checkedRows.splice(index, 1);
      }
    }
  });

  // Function to check if a row is already checked
  function isCheckedRow(rowData) {
    return checkedRows.some((item) => item.id === rowData.id);
  }
}

selectedAffiliateId = null;
const affiliateModalUsername = document.getElementById(
  'affiliate-modal-username'
);
const affiliateModalProfileImage = document.getElementById(
  'affiliate-modal-profile-image'
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

function viewDetails(id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#parcel_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  var foundObject = tableData.find(function (obj) {
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

  selectedAffiliateId = id;
  $('#affiliateModal').modal('show');
}

function getReferralList() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/referrals',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        tableLoader.style.display = 'none';
      } else {
        tableData = data.referral_list;
        populateToTable();
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      console.log('error', error);
    });
}

getReferralList();
