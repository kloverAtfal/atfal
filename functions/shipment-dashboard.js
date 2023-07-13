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

document
  .getElementById('add-new-shipment-btn')
  .addEventListener('click', function (e) {
    location.href = 'shipment-add-new';
  });

const tableLoader = document.getElementById('table-loader');

let tableData = [];

function populateToTable(data) {
  // updateTotals(data);

  // initialize Datatables with your table and column definitions
  const table = $('#example').DataTable({
    data: tableData,
    columns: [
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
                <span class="badge-text ml-1">${data}</span>
              </div>
            </div>
         `;
          } else {
            return `<div class="datatable-item-container">-</div>`;
          }
        },
      },
      {
        title: '<label class="datatable-header-title">Payment Status</label>',
        data: 'payment_status_data',
        render: function (data, type, row, meta) {
          if (data.code == 'not_paid') {
            return `
            <div class="datatable-item-container">
              <div class="badge-rounded-danger">
                <span class="badge-text ml-1">${data.name}</span>
              </div>
            </div>
         `;
          }
          if (data.code == 'pending') {
            return `
            <div class="datatable-item-container">
              <div class="badge-rounded-warning">
                <span class="badge-text ml-1">${data.name}</span>
              </div>
            </div>
         `;
          }
          if (data.code == 'paid') {
            return `
            <div class="datatable-item-container">
              <div class="badge-rounded-success">
                <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="shipment-dashboard-check06">
                <span class="badge-text ml-1">${data.name}</span>
              </div>
            </div>
         `;
          }
          if (data.code == 'refunded') {
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
          )})"><div class="datatable-item-title">${formatDate(
            data
          )}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title"></label>',
        data: 'id',
        orderable: false, // disable sorting for this column
        render: function (data, type, row, meta) {
          if (row.payment_status_data.code == 'not_paid') {
            return `<div class="datatable-item-container"><div class="datatable-item-title">
            <button onclick="payShipment('${row.custom_id}', this)" type="button" class="btn btn-warning btn-sm atfal-primary-btn">Pay</button>
            <button type="button" class="btn btn-light btn-sm atfal-secondary-btn">Edit</button>
          </div></div>`;
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">
               <button type="button" class="btn btn-light btn-sm atfal-secondary-btn">Edit</button>
              </div></div>`;
          }
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

function payShipment(custom_id_to_pay, button) {
  let useBtn = button;
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  const options = {
    body: JSON.stringify({
      shipment_custom_id: custom_id_to_pay,
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
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    })
    .catch((error) => {
      console.log('error', error);
      useBtn.disabled = false;
      useBtn.innerHTML = defaultBtnText;
    });
}

function editParcel(id) {
  location.href = `add-parcel?parcel_id=${id}`;
}

function deleteTracking(id, button) {}

function getShipmentList() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        tableLoader.style.display = 'none';
      } else {
        tableData = data.shipment_list;
        populateToTable();
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      console.log('error', error);
    });
}

getShipmentList();
