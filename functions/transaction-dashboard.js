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

let tabs = [];
var defaultTab = document.getElementById('alipay-topup-tab');
defaultTab.classList.add('show', 'active');
tabs.push(
  {
    id: 'alipay-topup-tab-content',
    title: 'Alipay Top Up',
    content: 'alipay-topup-tab',
  },
  {
    id: 'alipay-onbehalf-tab-content',
    title: 'Alipay Pay On Behalf (POB)',
    content: 'alipay-onbehalf-tab',
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

document
  .getElementById('add-new-transactions')
  .addEventListener('click', function (e) {
    location.href = `transaction-add-new`;
  });

const tableLoader = document.getElementById('table-loader');
const tableLoader2 = document.getElementById('table-loader2');
let tableData = [];
let tableData2 = [];

function populateToTableTopup() {
  // initialize Datatables with your table and column definitions
  const table = $('#example').DataTable({
    data: tableData,
    columns: [
      {
        title:
          '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Invoice Id</label></div>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
                <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
                </div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Remarks</label>',
        data: 'remark',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${
            data ? data : '-'
          }</div></div>`;
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
            <button onclick="payTopup('${row.custom_id}', this)" type="button" class="btn btn-warning btn-sm atfal-primary-btn">Pay</button>
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

function populateToTablePOB() {
  // initialize Datatables with your table and column definitions
  const table = $('#example2').DataTable({
    data: tableData2,
    columns: [
      {
        title:
          '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Invoice Id</label></div>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
                <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
                </div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Remarks</label>',
        data: 'remark',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${
            data ? data : '-'
          }</div></div>`;
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
            <button onclick="payTopup('${row.custom_id}', this)" type="button" class="btn btn-warning btn-sm atfal-primary-btn">Pay</button>
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
      tableLoader2.style.display = 'none';
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

function payTopup(custom_id_to_pay, button) {
  let useBtn = button;
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
}

function getTransactionList() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/top_up',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        tableLoader.style.display = 'none';
        tableLoader2.style.display = 'none';
      } else {
        tableData = data.topup_list;
        tableData2 = data.pob_list;
        populateToTableTopup();
        populateToTablePOB();
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      tableLoader2.style.display = 'none';
      console.log('error', error);
    });
}

getTransactionList();
