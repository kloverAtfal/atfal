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

document
  .getElementById('add-new-shipment-btn')
  .addEventListener('click', () => {
    location.href = 'shipment-add-new-shipment';
  });

// const totalWaiting = document.getElementById('text-total-waiting');
// const totalArrived = document.getElementById('text-total-arrived');
// const totalShipped = document.getElementById('text-total-shipped');

const tableLoader = document.getElementById('table-loader');

function updateTotals(data) {
  let waitingCount = 0;
  let arrivedCount = 0;
  let shippedCount = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].parcel_status_data.code == 'waiting') {
      waitingCount++;
    } else if (data[i].parcel_status_data.code == 'arrived') {
      arrivedCount++;
    } else if (data[i].parcel_status_data.code == 'shipped') {
      shippedCount++;
    }
  }

  // totalWaiting.innerText = waitingCount;
  // totalArrived.innerText = arrivedCount;
  // totalShipped.innerText = shippedCount;
}

const format = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  // hour: "numeric",
  // minute: "numeric",
  // hour12: true,
};

function formatDate(date) {
  if (date) {
    let fDate = new Date(date);
    var newDate = fDate.toLocaleString('en-US', format);
    return newDate;
  } else {
    return '-';
  }
}

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
        title: '<label class="datatable-header-title">Sender Name</label>',
        data: 'sender_name',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Receiver Name</label>',
        data: 'receiver_name',
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
        title: '<label class="datatable-header-title">Courier</label>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.courier.name}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Price</label>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${row.courier.price}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Shipping Status</label>',
        data: 'shipping_status_data.code',
        render: function (data, type, row, meta) {
          if (data == 'waiting') {
            return `<div class="shipment-dashboard-tablecell40">
            <div class="shipment-dashboard-badge08">
              <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="shipment-dashboard-check06">
              <span class="shipment-dashboard-text098 TextxsMedium">
                <span>${data}</span>
              </span>
            </div>
          </div>`;
          }
          if (data == 'arrived') {
            return `<div class="shipment-dashboard-tablecell40">
                        <div class="shipment-dashboard-badge08">
                          <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="shipment-dashboard-check06">
                          <span class="shipment-dashboard-text098 TextxsMedium">
                            <span>${data}</span>
                          </span>
                        </div>
                      </div>`;
          }
          if (data.code == 'shipped') {
            return `<div class="shipment-dashboard-tablecell40">
            <div class="shipment-dashboard-badge08">
              <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="shipment-dashboard-check06">
              <span class="shipment-dashboard-text098 TextxsMedium">
                <span>${data}</span>
              </span>
            </div>
          </div>`;
          } else {
            return `<div class="shipment-dashboard-tablecell40">-</div>`;
          }
        },
      },
      {
        title: '<label class="datatable-header-title">Payment Status</label>',
        data: 'payment_status_data',
        render: function (data, type, row, meta) {
          if (data.code == 'not_paid') {
            return `${data.name}`;
          }
          if (data.code == 'pending') {
            return `${data.name}`;
          }
          if (data.code == 'paid') {
            return `${data.name}`;
          }
          if (data.code == 'refunded') {
            return `${data.name}`;
          } else {
            return `<div class="shipment-dashboard-tablecell40">-</div>`;
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
          // if (row.payment_status_data.code == 'not_paid') {
          // <button class="dropdown-item" type="button" onclick="payShipment('${custom_id}')">
          return `<div class="datatable-item-container"><div class="datatable-item-title">

          <div class="shipment-dashboard-tablecell48">
                        <a class="shipment-dashboard-button03">
                          <img alt="eyeI5296" src="public/external/eyei5296-tnpl.svg" class="shipment-dashboard-eye">
                        </a>
                        <a onclick="deleteShipment(${data}, this)" class="shipment-dashboard-button04">
                          <img alt="trash01I5296" src="public/external/trash01i5296-x52rd.svg" class="shipment-dashboard-trash01">
                        </a>
                        <a onclick="editShipment(${data}, this)" class="shipment-dashboard-button05">
                          <img alt="edit01I5296" src="public/external/edit01i5296-lv4a.svg" class="shipment-dashboard-edit01">
                        </a>
                      </div>

            
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

  // var buttonDownloadCSV = document.getElementById('button-download-csv');
  // buttonDownloadCSV.addEventListener('click', function () {
  //   table.button('.buttons-csv').trigger();
  // });

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

function editParcel(id) {
  location.href = `add-parcel?parcel_id=${id}`;
}

function deleteTracking(id, button) {
  let text = 'Are you sure you want to delete this parcel record?';
  if (confirm(text) == true) {
  } else {
    return;
  }

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/parcel/${id}`,
    'DELETE',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
      } else {
        // Get the DataTable row element corresponding to the clicked button
        var row = $(button).closest('tr');
        // Remove the row from the DataTable
        $('#example').DataTable().row(row).remove().draw();
        showToast(
          'alert-toast-container',
          'Parcel deleted successfully!',
          'success'
        );
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}

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
