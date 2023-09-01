// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'admin',
  sidebarNavigationLoaded()
);

function sidebarNavigationLoaded() {
  document.getElementById('body-content').style.display = 'block';
  document.getElementById('logout-modal-container').innerHTML = logoutModal();
  document.getElementById('edit-parcel-modal-container').innerHTML =
    editParcelModal();
  document.getElementById('edit-transaction-modal-container').innerHTML =
    editTransactionModal();
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
var defaultTab = document.getElementById('parcel-tab');
defaultTab.classList.add('show', 'active');
tabs.push(
  {
    id: 'parcel-tab-content',
    title: 'All Parcel',
    content: 'parcel-tab',
  },
  {
    id: 'shipment-tab-content',
    title: 'All Shipment',
    content: 'shipment-tab',
  },
  {
    id: 'transaction-tab-content',
    title: 'All Transaction',
    content: 'transaction-tab',
  },
  {
    id: 'payout-tab-content',
    title: 'All Payout',
    content: 'payout-tab',
  },
  {
    id: 'rate-and-fees-tab-content',
    title: 'Rate and Fees',
    content: 'rate-and-fees-tab',
  },
  {
    id: 'currency-pair-content',
    title: 'Currency Rate',
    content: 'currency-pair-tab',
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

// document
//   .getElementById('add-new-transactions')
//   .addEventListener('click', function (e) {
//     location.href = `transaction-add-new`;
//   });

const tableLoader = document.getElementById('table-loader');
const tableLoader2 = document.getElementById('table-loader2');
const tableLoader3 = document.getElementById('table-loader3');
const tableLoader4 = document.getElementById('table-loader4');
let tableDataParcel = [];
let tableDataShipment = [];
let tableDataTransaction = [];
let tableDataPayout = [];

function populateToTableParcel() {
  // initialize Datatables with your table and column definitions

  const table = $('#parcel_table').DataTable({
    data: tableDataParcel,
    columns: [
      {
        title:
          '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Parcel ID</label></div>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
                <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
                </div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Tracking Number</label>',
        data: 'tracking_number',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Parcel Content</label>',
        data: 'content',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Remarks</label>',
        data: 'remarks',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${
            data ? data : '-'
          }</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Parcel Status</label>',
        data: 'parcel_status_data',
        render: function (data, type, row, meta) {
          data.code;
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
              <div class="badge-rounded-success">
                <span class="badge-text ml-1">${data.name}</span>
              </div>
            </div>
         `;
          }
          if (data.code == 'shipped') {
            return `
            <div class="datatable-item-container">
              <div class="badge-rounded-info">
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
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <button onclick="editParcel('${row.custom_id}', this)" type="button" class="btn btn-light btn-sm atfal-secondary-btn">Edit</button>
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

function populateToTableShipment() {
  // initialize Datatables with your table and column definitions
  const table = $('#shipment_table').DataTable({
    data: tableDataShipment,
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
          data.code;
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
            return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
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
            return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
          }
        },
      },
      {
        title: '<label class="datatable-header-title">Allow to pay</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          if (row?.shipment_price_data) {
            return `<div class="datatable-item-container"><div class="datatable-item-title">${
              row?.shipment_price_data?.allow_payment == true ? 'Yes' : 'No'
            }</div></div>`;
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">-</div></div>`;
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
      // {
      //   title: '<label class="datatable-header-title">Cost List</label>',
      //   data: 'cost',
      //   render: function (data, type, row, meta) {
      //     let formattedItems = '';

      //     if (data && data.length > 0) {
      //       formattedItems = data
      //         .map((item, index) => {
      //           const valueText =
      //             item.value_type === 'percentage'
      //               ? `${item.value}%`
      //               : item.value;
      //           return `
      //                 <div class="item-container">
      //                     <div>${index + 1}. ${item.name} (${valueText})</div>
      //                 </div>`;
      //         })
      //         .join('');
      //     } else {
      //       formattedItems = '<div class="no-data-message">-</div>';
      //     }

      //     return `<div class="datatable-item-container"><div class="datatable-item-title">${formattedItems}</div></div>`;
      //   },
      // },
      {
        title: '<label class="datatable-header-title"></label>',
        data: 'id',
        orderable: false, // disable sorting for this column
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <button onclick="editShipment('${row.custom_id}', this)" type="button" class="btn btn-light btn-sm atfal-secondary-btn">Edit</button>
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

function populateToTableTransaction() {
  // initialize Datatables with your table and column definitions

  const table = $('#transaction_table').DataTable({
    data: tableDataTransaction,
    columns: [
      {
        title:
          '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">ID Id</label></div>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
                <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
                </div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Type</label>',
        data: 'category',
        render: function (data, type, row, meta) {
          let typeDetails = {
            alipay_topup: {
              name: 'Topup',
            },
            alipay_pob: {
              name: 'POB',
            },
          };

          return `<div class="datatable-item-container"><div class="datatable-item-title">${
            data ? typeDetails[data].name : '-'
          }</div></div>`;
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
        data: 'id',
        render: function (data, type, row, meta) {
          if (row?.topup_price_data) {
            if (row?.topup_price_data?.payment_status_data) {
              return `
                <div class="datatable-item-container">
                  <div class="badge-rounded-${row?.topup_price_data?.payment_status_data.theme}">
                    <span class="badge-text ml-1">${row?.topup_price_data?.payment_status_data.name}</span>
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
          if (row?.topup_price_data) {
            return `<div class="datatable-item-container"><div class="datatable-item-title">${row.topup_price_data.price_myr}</div></div>`;
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
          if (row?.topup_price_data) {
            return `<div class="datatable-item-container"><div class="datatable-item-title">${row.topup_price_data.fee_percentage}</div></div>`;
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
        title: '<label class="datatable-header-title">Status</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          if (row?.topup_status_data) {
            return `<div class="datatable-item-container"><div class="datatable-item-title">
            <div class="badge-rounded-info"><span class="badge-text ml-1">${row.topup_status_data.name}</div></div></div></div>`;
          } else {
            return `<div class="datatable-item-container"><div class="datatable-item-title">
                <span class="badge-text ml-1">-</span>
            </div></div>`;
          }
        },
      },
      {
        title: '<label class="datatable-header-title"></label>',
        data: 'id',
        orderable: false, // disable sorting for this column
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <button onclick="editTransaction('${row.custom_id}', this)" type="button" class="btn btn-light btn-sm atfal-secondary-btn">Edit</button>
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
      tableLoader3.style.display = 'none';
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

function populateToTablePayout() {
  // initialize Datatables with your table and column definitions

  const table = $('#payout_table').DataTable({
    data: tableDataPayout,
    columns: [
      {
        title: '<label class="datatable-header-title">User</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          defaultImage = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`;
          if (row.profile_image) {
            defaultImage = row.profile_image.url;
          }

          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <div class="d-flex" style="text-decoration: none">
            <img src="${defaultImage}" class="rounded-circle mr-2" style="width: 35px; height: 35px" alt="Avatar">
            <div class="form-label mr-2 row">
              <span>${row.username}</span>
              <span class="small">${row.email}</span>
            </div>
            </div>
          </div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Members</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          var totalTeam = 0;
          if (row.referrals_of_user_data) {
            totalTeam = row.referrals_of_user_data.length;
          }
          return `<div class="datatable-item-container"><div class="datatable-item-title">${totalTeam}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Total Sales</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          var shipment_list = [];
          var transaction_list = [];
          var total_shipment = 0;
          var total_transaction = 0;
          var total = 0;

          if (row.referrals_of_user_data.length > 0) {
            row.referrals_of_user_data.map((item) => {
              if (item.shipment_price_of_user_data.length > 0) {
                item.shipment_price_of_user_data.map((item2) => {
                  shipment_list.push(item2);
                });
              }

              if (item.topup_price_of_user_data.length > 0) {
                item.topup_price_of_user_data.map((item3) => {
                  transaction_list.push(item3);
                });
              }
            });
          }

          shipment_list.map(function (item) {
            if (
              item.payment_status_id == 1 &&
              item.payout_payment_status_id !== 1
            ) {
              var price = item.price_myr ? parseFloat(item.price_myr) : 0;
              total_shipment = total_shipment + price;
            }
          });

          transaction_list.map(function (item) {
            if (
              item.payment_status_id == 1 &&
              item.payout_payment_status_id !== 1
            ) {
              var price = item.price_myr ? parseFloat(item.price_myr) : 0;
              total_transaction = total_transaction + price;
            }
          });

          total = total_shipment + total_transaction;

          return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
            total.toFixed(2)
          ).toString()}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title">Total Payout</label>',
        data: 'id',
        render: function (data, type, row, meta) {
          var shipment_list = [];
          var transaction_list = [];
          var total_shipment = 0;
          var total_transaction = 0;
          var total = 0;

          if (row.referrals_of_user_data.length > 0) {
            row.referrals_of_user_data.map((item) => {
              if (item.shipment_price_of_user_data.length > 0) {
                item.shipment_price_of_user_data.map((item2) => {
                  shipment_list.push(item2);
                });
              }

              if (item.topup_price_of_user_data.length > 0) {
                item.topup_price_of_user_data.map((item3) => {
                  transaction_list.push(item3);
                });
              }
            });
          }

          shipment_list.map(function (item) {
            if (
              item.payment_status_id == 1 &&
              item.payout_payment_status_id !== 1
            ) {
              var price = item.price_myr ? parseFloat(item.price_myr) : 0;
              var comm = item.payout_percentage
                ? parseFloat(item.payout_percentage)
                : 0;

              total_shipment = total_shipment + (comm / 100) * price;
            }
          });

          transaction_list.map(function (item) {
            if (
              item.payment_status_id == 1 &&
              item.payout_payment_status_id !== 1
            ) {
              var price = item.price_myr ? parseFloat(item.price_myr) : 0;
              var comm = item.payout_percentage
                ? parseFloat(item.payout_percentage)
                : 0;

              total_transaction = total_transaction + (comm / 100) * price;
            }
          });

          total = total_shipment + total_transaction;

          return `<div class="datatable-item-container"><div class="datatable-item-title">RM ${parseFloat(
            total.toFixed(2)
          ).toString()}</div></div>`;
        },
      },
      {
        title: '<label class="datatable-header-title"></label>',
        data: 'id',
        orderable: false, // disable sorting for this column
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
            <button onclick="editPayout('${data}', this)" type="button" class="btn btn-light btn-sm atfal-secondary-btn">Edit</button>
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
      tableLoader4.style.display = 'none';
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

const editPayoutUsername = document.getElementById('edit-payout-username');
var editPayoutTotalComm = document.getElementById('edit-unpaid-payout');
var shipment_payout_list = [];
var transaction_payout_list = [];

function editPayout(id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#payout_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  var foundObject = tableDataPayout.find(function (obj) {
    return obj.id.toString() === id.toString();
  });

  editPayoutUsername.innerHTML = foundObject.username;

  if (foundObject) {
    var shipment_list = [];
    var transaction_list = [];
    var total_shipment = 0;
    var total_transaction = 0;
    var total = 0;

    if (foundObject.referrals_of_user_data.length > 0) {
      foundObject.referrals_of_user_data.map((item) => {
        if (item.shipment_price_of_user_data.length > 0) {
          item.shipment_price_of_user_data.map((item2) => {
            shipment_list.push(item2);
          });
        }

        if (item.topup_price_of_user_data.length > 0) {
          item.topup_price_of_user_data.map((item3) => {
            transaction_list.push(item3);
          });
        }
      });
    }

    shipment_list.map(function (item) {
      if (item.payment_status_id == 1 && item.payout_payment_status_id !== 1) {
        var price = item.price_myr ? parseFloat(item.price_myr) : 0;
        var comm = item.payout_percentage
          ? parseFloat(item.payout_percentage)
          : 0;

        total_shipment = total_shipment + (comm / 100) * price;
        shipment_payout_list.push(item);
      }
    });

    transaction_list.map(function (item) {
      if (item.payment_status_id == 1 && item.payout_payment_status_id !== 1) {
        var price = item.price_myr ? parseFloat(item.price_myr) : 0;
        var comm = item.payout_percentage
          ? parseFloat(item.payout_percentage)
          : 0;

        total_transaction = total_transaction + (comm / 100) * price;
        transaction_payout_list.push(item);
      }
    });

    total = total_shipment + total_transaction;

    editPayoutTotalComm.innerHTML = `RM ${parseFloat(
      total.toFixed(2)
    ).toString()}`;

    if (total > 0) {
      inputSelectPayoutStatus.disabled = false;
    } else {
      inputSelectPayoutStatus.disabled = true;
    }
  } else {
    shipment_payout_list = [];
    transaction_payout_list = [];
    inputSelectPayoutStatus.disabled = true;
  }

  $('#editPayoutModal').modal('show');
}

document
  .getElementById('edit-payout-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-payout-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    let shipment_array_id = [];
    shipment_payout_list.map((item) => {
      shipment_array_id.push({ shipment_price_id: item.id });
    });

    let topup_array_id = [];
    transaction_payout_list.map((item) => {
      topup_array_id.push({ topup_price_id: item.id });
    });

    const options = {
      body: JSON.stringify({
        shipment_price_list: shipment_array_id,
        topup_price_list: topup_array_id,
        payout_status_id: inputSelectPayoutStatus.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/payout',
      'PUT',
      token,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          var tableRef = $('#payout_table').DataTable();
          var rowIndex = selectedRowIndex;
          var rowData = data.new_parcel;
          tableRef.row(rowIndex).data(rowData).draw();

          $('#editPayoutModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
            'success'
          );
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

var selectedRowIndex = null;

var feeData = [];
var preId_fee = 'input-fee';
var rateData = [];
var preId_rate = 'input-rate';
var currencyData = [];
var preId_currency = 'input-currency';

var totalPrice = document.getElementById('total-price-shipment');
const inputShippingPrice = document.getElementById('input-shipping-price');
const inputShippingFee = document.getElementById('input-shipping-fee');
const inputSelectShipmentStatus = document.getElementById(
  'input-select-shipment-status'
);
const inputSelectAllowToPay = document.getElementById(
  'input-select-allow-to-pay'
);

var selectedParcelCustomId = null;
var selectedShipmentCustomId = null;
var selectedTransactionCustomId = null;

var shipmentFreeDefaultValue = 0;

const inputSelectParcelStatus = document.getElementById(
  'input-select-parcel-status'
);

const inputSelectTransactionStatus = document.getElementById(
  'input-select-transaction-status'
);

const inputSelectPayoutStatus = document.getElementById(
  'input-select-payout-status'
);

function editShipment(custom_id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#shipment_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  var foundObject = tableDataShipment.find(function (obj) {
    return obj.custom_id === custom_id;
  });

  if (foundObject) {
    if (foundObject?.shipment_price_data) {
      inputShippingPrice.value = foundObject.shipment_price_data.price_myr;
      inputShippingFee.value = foundObject.shipment_price_data.fee_percentage;

      inputSelectShipmentStatus.value = foundObject.shipping_status_id;
      inputSelectAllowToPay.value =
        foundObject.shipment_price_data.allow_payment;

      if (foundObject.shipment_price_data.payment_status_data.id == 1) {
        inputShippingPrice.disabled = true;

        inputSelectAllowToPay.disabled = true;
      } else {
        inputShippingPrice.disabled = false;

        inputSelectAllowToPay.disabled = false;
      }
    } else {
      inputShippingPrice.value = 0;
      inputShippingFee.value = shipmentFreeDefaultValue;

      inputSelectShipmentStatus.value = '';
      inputSelectAllowToPay.value = '';

      inputShippingPrice.disabled = false;

      inputSelectAllowToPay.disabled = false;
    }

    document.getElementById('edit-shipment-id').innerHTML =
      foundObject.custom_id;
    selectedShipmentCustomId = foundObject.custom_id;
    populateToEditShipmentFee();
    $('#editShipmentModal').modal('show');
  }
}

function editParcel(custom_id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#parcel_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  var foundObject = tableDataParcel.find(function (obj) {
    return obj.custom_id === custom_id;
  });

  if (foundObject) {
    inputSelectParcelStatus.value = foundObject.parcel_status_id;
  } else {
    inputSelectParcelStatus.value = '';
  }

  document.getElementById('edit-parcel-id').innerHTML = foundObject.custom_id;

  selectedParcelCustomId = custom_id;

  $('#editParcelModal').modal('show');
}

function editTransaction(custom_id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#transaction_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  var foundObject = tableDataTransaction.find(function (obj) {
    return obj.custom_id === custom_id;
  });

  if (foundObject) {
    inputSelectTransactionStatus.value = foundObject.topup_status_id;
  } else {
    inputSelectTransactionStatus.value = '';
  }

  document.getElementById('edit-transaction-id').innerHTML =
    foundObject.custom_id;

  selectedTransactionCustomId = custom_id;

  $('#editTransactionModal').modal('show');
}

document
  .getElementById('edit-parcel-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-parcel-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        custom_id: selectedParcelCustomId,
        parcel_status_id: inputSelectParcelStatus.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/parcel',
      'PUT',
      token,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          var tableRef = $('#parcel_table').DataTable();
          var rowIndex = selectedRowIndex;
          var rowData = data.new_parcel;
          tableRef.row(rowIndex).data(rowData).draw();

          $('#editParcelModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
            'success'
          );
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('edit-transaction-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-transaction-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        custom_id: selectedTransactionCustomId,
        topup_status_id: inputSelectTransactionStatus.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/top_up',
      'PUT',
      token,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          var tableRef = $('#transaction_table').DataTable();
          var rowIndex = selectedRowIndex;
          var rowData = data.new_transaction;
          tableRef.row(rowIndex).data(rowData).draw();

          $('#editTransactionModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
            'success'
          );
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

inputShippingPrice.addEventListener('input', function () {
  totalPrice.innerHTML = `...`;
  clearTimeout(this.timerId);
  this.timerId = setTimeout(() => {
    populateToEditShipmentFee();
  }, 1000);
});

function populateToEditShipmentFee() {
  totalPrice.innerHTML = 0;
  var price1 = inputShippingPrice.value
    ? parseFloat(inputShippingPrice.value)
    : 0;
  var price2 = inputShippingFee.value ? parseFloat(inputShippingFee.value) : 0;
  const fee_price = (price2 / 100) * price1;
  const formattedTotal = price1 + fee_price;
  totalPrice.innerHTML = parseFloat(formattedTotal.toFixed(2)).toString();
}

document
  .getElementById('edit-shipment-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#edit-shipment-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        custom_id: selectedShipmentCustomId,
        shipping_status_id: inputSelectShipmentStatus.value,
        price_myr: inputShippingPrice.value,
        allow_payment: inputSelectAllowToPay.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/update/shipment',
      'PUT',
      token,
      options
    )
      .then((data) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;

        if (data?.message) {
          showToast('alert-toast-container', data.message, 'danger');
        } else {
          var tableRef = $('#shipment_table').DataTable();
          var rowIndex = selectedRowIndex;
          var rowData = data.new_shipment;
          tableRef.row(rowIndex).data(rowData).draw();

          $('#editShipmentModal').modal('hide');
          showToast(
            'alert-toast-container',
            'Updated successfully!',
            'success'
          );

          var updatedTableDataShipment = tableDataShipment.map(function (
            oldRecord
          ) {
            if (oldRecord.custom_id === rowData.custom_id) {
              return rowData; // Replace the old record with the new one
            } else {
              return oldRecord; // Keep other records unchanged
            }
          });

          tableDataShipment = updatedTableDataShipment;
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function populateToFee() {
  const parentTable = document.getElementById('form-parent-fee');
  const child = document.getElementById('form-child-fee');
  const emptyDiv = [];

  if (feeData.length !== 0) {
    feeData.map((item) => {
      const card = child.cloneNode(true);
      const label = card.getElementsByTagName('label');
      const formInput = card.getElementsByTagName('input');
      label[0].innerHTML = `${item.name} ${
        item.value_type == 'percentage' ? '(%)' : ''
      }`;
      formInput[0].setAttribute('id', `${preId_fee}-${item.code}`);
      formInput[0].value = item.value;
      emptyDiv.push(card);
    });
  }

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

function populateToRate() {
  const parentTable = document.getElementById('form-parent-rate');
  const child = document.getElementById('form-child-rate');
  const emptyDiv = [];

  if (rateData.length !== 0) {
    rateData.map((item) => {
      const card = child.cloneNode(true);
      const label = card.getElementsByTagName('label');
      const formInput = card.getElementsByTagName('input');
      label[0].innerHTML = `${item.name} ${
        item.value_type == 'percentage' ? '(%)' : ''
      }`;
      formInput[0].setAttribute('id', `${preId_rate}-${item.code}`);
      formInput[0].value = item.value;
      emptyDiv.push(card);
    });
  }

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

function populateToCurrency() {
  const parentTable = document.getElementById('form-parent-currency');
  const child = document.getElementById('form-child-currency');
  const emptyDiv = [];

  if (currencyData.length !== 0) {
    currencyData.map((item) => {
      const card = child.cloneNode(true);
      const label = card.getElementsByTagName('label');
      const formInput = card.getElementsByTagName('input');
      label[0].innerHTML = `${item.name} (${item.short_name})`;
      formInput[0].setAttribute('id', `${preId_currency}-${item.code}`);
      formInput[0].value = item.value;
      emptyDiv.push(card);
    });
  }

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

document
  .getElementById('currency-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#save-currency-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const allCurrency = [];
    currencyData.map((item) => {
      const currencyForm = document.getElementById(
        `${preId_currency}-${item.code}`
      );

      if (currencyForm?.value) {
        allCurrency.push({ code: item.code, value: currencyForm.value });
      }
    });

    const options = {
      body: JSON.stringify({
        currency_list: allCurrency,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/currency/update',
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
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

document
  .getElementById('rate-and-fees-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#save-rate-and-fees-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const allRate = [];
    rateData.map((item) => {
      const rateForm = document.getElementById(`${preId_rate}-${item.code}`);
      if (rateForm?.value) {
        allRate.push({ code: item.code, value: rateForm.value });
      }
    });

    const allFee = [];
    feeData.map((item) => {
      const rateFee = document.getElementById(`${preId_fee}-${item.code}`);
      if (rateFee?.value) {
        allFee.push({ code: item.code, value: rateFee.value });
      }
    });

    const options = {
      body: JSON.stringify({
        rate_fee_list: allRate.concat(allFee),
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/rate_fee/update',
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
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

function populateToParcelSummary() {
  let totalWaiting = 0;
  tableDataParcel.map((item) => {
    if (item.parcel_status_data.code == 'waiting') {
      totalWaiting = totalWaiting + 1;
    }
  });

  const summaryContainer = document.getElementById('parcel-summary-container');
  const summaryBody = document.getElementById('parcel-summary-body');

  if (totalWaiting > 0) {
    let summaryText = `Action Required: <strong>${totalWaiting}</strong> items is on waiting status`;
    summaryBody.innerHTML = summaryText;
    summaryContainer.style.display = 'block';
  } else {
    summaryBody.innerHTML = '';
    summaryContainer.style.display = 'none';
  }
}

function populateToShipmentSummary() {
  let totalPendingPrice = 0;
  let totalWaiting = 0;
  tableDataShipment.map((item) => {
    if (item?.shipment_price_data) {
    } else {
      totalPendingPrice = totalPendingPrice + 1;
    }
    if (item.shipping_status_data.code == 'waiting') {
      totalWaiting = totalWaiting + 1;
    }
  });

  const summaryContainer = document.getElementById(
    'shipping-summary-container'
  );
  const summaryBody = document.getElementById('shipping-summary-body');

  if (totalPendingPrice > 0 || totalWaiting > 0) {
    let summaryText = 'Action Required:';
    if (totalPendingPrice > 0) {
      summaryText += ` Pending Prices for <strong>${totalPendingPrice}</strong> items`;
    }
    if (totalWaiting > 0) {
      summaryText += ` ${
        totalPendingPrice > 0 ? ',' : ''
      } <strong>${totalWaiting}</strong> items is on waiting status`;
    }
    summaryBody.innerHTML = summaryText;
    summaryContainer.style.display = 'block';
  } else {
    summaryBody.innerHTML = '';
    summaryContainer.style.display = 'none';
  }
}

function populateToTransactionSummary() {
  let totalPending = 0;
  tableDataTransaction.map((item) => {
    if (item?.topup_status_data) {
      if (item.topup_status_data.code == 'pending') {
        totalPending = totalPending + 1;
      }
    }
  });

  const summaryContainer = document.getElementById(
    'transaction-summary-container'
  );
  const summaryBody = document.getElementById('transaction-summary-body');

  if (totalPending > 0) {
    let summaryText = `Action Required: <strong>${totalPending}</strong> items is on pending status`;
    summaryBody.innerHTML = summaryText;
    summaryContainer.style.display = 'block';
  } else {
    summaryBody.innerHTML = '';
    summaryContainer.style.display = 'none';
  }
}

function firstFetch() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/admin/master',
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
        tableDataParcel = data.parcel_list;
        tableDataShipment = data.shipment_list;
        tableDataTransaction = data.transaction_list;
        tableDataPayout = data.referral_list;

        currencyData = data.currency_list;
        feeData = data.fee_list;
        rateData = data.rate_list;

        data.fee_list.map((item) => {
          if (item.type == 'fee' && item.code == 'sf') {
            shipmentFreeDefaultValue = item.value;
          }
        });

        populateToParcelSummary();
        populateToTableParcel();
        populateToShipmentSummary();
        populateToTableShipment();
        populateToTransactionSummary();
        populateToTableTransaction();
        populateToTablePayout();

        populateToFee();
        populateToRate();

        populateToCurrency();

        data.parcel_status_list.unshift({ id: '', name: 'Please Select' });
        data.parcel_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectParcelStatus.appendChild(optionElement);
        });

        data.transaction_status_list.unshift({ id: '', name: 'Please Select' });
        data.transaction_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectTransactionStatus.appendChild(optionElement);
        });

        data.payout_status_list.unshift({ id: '', name: 'Please Select' });
        data.payout_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectPayoutStatus.appendChild(optionElement);
        });

        data.shipping_status_list.unshift({ id: '', name: 'Please Select' });
        data.shipping_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectShipmentStatus.appendChild(optionElement);
        });

        [
          { id: '', name: 'Please Select' },
          { id: 'true', name: 'Yes' },
          { id: 'false', name: 'No' },
        ].forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectAllowToPay.appendChild(optionElement);
        });
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      tableLoader2.style.display = 'none';
      console.log('error', error);
    });
}

firstFetch();
