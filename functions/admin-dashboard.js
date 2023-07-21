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
  document.getElementById('edit-shipment-modal-container').innerHTML =
    editShipmentModal();
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
let tableDataParcel = [];
let tableDataShipment = [];

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

var selectedRowIndex = null;

const inputSelectParcelStatus = document.getElementById(
  'input-select-parcel-status'
);
const inputSelectShipmentStatus = document.getElementById(
  'input-select-shipment-status'
);

var selectedParcelCustomId = null;
var selectedShipmentCustomId = null;

function editParcel(custom_id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#parcel_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  document.getElementById('edit-parcel-id').innerHTML = custom_id;
  selectedParcelCustomId = custom_id;
  $('#editParcelModal').modal('show');
}

function editShipment(custom_id, button) {
  var closestRow = $(button).closest('tr');
  var tableRef = $('#shipment_table').DataTable();
  var rowIndex = tableRef.row(closestRow).index();
  selectedRowIndex = rowIndex;

  document.getElementById('edit-shipment-id').innerHTML = custom_id;
  selectedShipmentCustomId = custom_id;
  $('#editShipmentModal').modal('show');
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
        }
      })
      .catch((error) => {
        useBtn.disabled = false;
        useBtn.innerHTML = defaultBtnText;
        console.log('error', error);
      });
  });

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
        populateToTableParcel();
        populateToTableShipment();

        data.parcel_status_list.unshift({ id: '', name: 'Please Select' });
        data.parcel_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectParcelStatus.appendChild(optionElement);
        });

        data.shipping_status_list.unshift({ id: '', name: 'Please Select' });
        data.shipping_status_list.forEach((item) => {
          const optionElement = document.createElement('option');
          optionElement.value = item.id;
          optionElement.text = item.name;
          inputSelectShipmentStatus.appendChild(optionElement);
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
