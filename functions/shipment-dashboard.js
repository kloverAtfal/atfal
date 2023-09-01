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

document
  .getElementById('add-new-shipment-btn')
  .addEventListener('click', function (e) {
    location.href = 'shipment-add-new';
  });

document
  .getElementById('add-new-shipment-btn-2')
  .addEventListener('click', function (e) {
    location.href = 'shipment-add-new';
  });

function alreadyPaid(custom_id) {
  showToast(
    'alert-toast-container',
    `The payment for shipment Id ${custom_id} has already been completed.`,
    'success'
  );
}

function notAcceptPaymentYet(custom_id) {
  showToast(
    'alert-toast-container',
    `Payment processing is not yet open for shipment Id ${custom_id}`,
    'danger'
  );
}

const tableLoader = document.getElementById('table-loader');
const tableEmpty = document.getElementById('table-empty');

let tableData = [];

function populateToTable(data) {
  // updateTotals(data);

  // initialize Datatables with your table and column definitions
  const table = $('#example').DataTable({
    data: tableData,
    columns: [
      {
        title:
          '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">ID</label></div>',
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
              <div class="badge-rounded-success">
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
        title: '<label class="datatable-header-title">Price MYR</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          if (row?.shipment_price_data) {
            return `<div class="datatable-item-container"><div class="datatable-item-title">${row.shipment_price_data.price_myr}</div></div>`;
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
          if (row?.shipment_price_data) {
            return `<div class="datatable-item-container"><div class="datatable-item-title">${row.shipment_price_data.fee_percentage}</div></div>`;
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
        title: '<label class="datatable-header-title"></label>',
        data: 'id',
        orderable: false, // disable sorting for this column
        render: function (data, type, row, meta) {
          if (row?.shipment_price_data) {
            if (row?.shipment_price_data?.payment_status_data?.code == 'paid') {
              return `<div class="datatable-item-container"><div class="datatable-item-title">
               <button type="button" onclick="alreadyPaid('${row.custom_id}', this)" class="btn btn-outline-secondary btn-sm atfal-secondary-btn">Paid</button>
              </div></div>`;
            } else {
              if (row?.shipment_price_data.allow_payment) {
                return `<div class="datatable-item-container"><div class="datatable-item-title">
                <button onclick="shipmentDetails('${row.id}', this)" type="button" class="btn btn-warning btn-sm atfal-primary-btn">Pay</button>
              </div></div>`;
              } else {
                return `<div class="datatable-item-container"><div class="datatable-item-title">
                <button type="button" onclick="notAcceptPaymentYet('${row.custom_id}', this)" class="btn btn-outline-secondary btn-sm atfal-secondary-btn">Pay</button>
               </div></div>`;
              }
            }
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">
               <button type="button" onclick="notAcceptPaymentYet('${row.custom_id}', this)" class="btn btn-outline-secondary btn-sm atfal-secondary-btn">Pay</button>
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

var currentSelectedShipmentId = null;

document
  .getElementById('retry-price-btn')
  .addEventListener('click', function (e) {
    shipmentDetails(currentSelectedShipmentId);
  });

function makePayment(id, button) {
  let useBtn = button;
  let defaultBtnText = useBtn.innerHTML;

  useBtn.disabled = true;
  useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

  const options = {
    body: JSON.stringify({
      shipment_price_id: id,
    }),
  };

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment/price/pay`,
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

function shipmentDetails(shipment_id, button) {
  $('#payModal').modal('show');

  currentSelectedShipmentId = shipment_id;

  const listLoader = document.getElementById('price-list-loader');
  const listEmpty = document.getElementById('price-list-empty');
  const listContainer = document.getElementById('price-list-container');
  const checkOutBtn = document.getElementById('check-out-btn');

  listEmpty.classList.add('hidden');
  listLoader.classList.remove('hidden');
  listContainer.classList.add('hidden');
  checkOutBtn.disabled = true;

  fetchAPI(
    `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/shipment/price/${shipment_id}`,
    'GET',
    token
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        listEmpty.classList.remove('hidden');
        listLoader.classList.add('hidden');
        listContainer.classList.add('hidden');
        checkOutBtn.disabled = true;
      } else {
        listLoader.classList.add('hidden');
        listContainer.classList.remove('hidden');
        checkOutBtn.disabled = false;

        const orderId = document.getElementById('text-order-id');
        const totalBig = document.getElementById('text-total-big');
        const shipment = document.getElementById('text-shipment');
        const fees = document.getElementById('text-fees');
        const total = document.getElementById('text-total');

        data = data.price_data;
        var price1 = data.price_myr ? parseFloat(data.price_myr) : 0;
        var price2 = data.fee_percentage ? parseFloat(data.fee_percentage) : 0;

        const fee_price = (price2 / 100) * price1;
        const formattedTotal = price1 + fee_price;

        orderId.innerHTML = `Pay for shipment: ${data.shipment_data.custom_id}`;
        totalBig.innerHTML = `RM ${parseFloat(
          formattedTotal.toFixed(2)
        ).toString()}`;
        shipment.innerHTML = `RM ${parseFloat(price1.toFixed(2)).toString()}`;
        fees.innerHTML = `RM ${parseFloat(fee_price.toFixed(2)).toString()}`;
        total.innerHTML = `RM ${parseFloat(
          formattedTotal.toFixed(2)
        ).toString()}`;

        checkOutBtn.addEventListener('click', function (e) {
          makePayment(data.id, this);
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
      listEmpty.classList.remove('hidden');
      listLoader.classList.add('hidden');
      listContainer.classList.add('hidden');
      checkOutBtn.disabled = true;
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
        if (data.shipment_list.length > 0) {
          tableData = data.shipment_list;
          populateToTable();
          tableEmpty.style.display = 'none';
        } else {
          tableLoader.style.display = 'none';
          tableEmpty.style.display = 'block';
        }
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      tableEmpty.style.display = 'block';
      console.log('error', error);
    });
}

getShipmentList();
