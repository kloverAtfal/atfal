// --- start auth function

if (!token) {
  location.href = 'index';
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'parcel',
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
  { text: 'Parcel', url: 'parcel-dashboard.html', isActive: true },
];
generateBreadcrumb(breadcrumbData);

document
  .getElementById('add-new-parcel-btn')
  .addEventListener('click', function (e) {
    $('#newParcelModal').modal('show');
  });

document
  .getElementById('add-new-parcel-btn-2')
  .addEventListener('click', function (e) {
    $('#newParcelModal').modal('show');
  });

const tableLoader = document.getElementById('table-loader');
const tableEmpty = document.getElementById('table-empty');

let tableData = [];

function populateToTable(data) {
  // updateTotals(data);

  // initialize Datatables with your table and column definitions
  const table = $('#example').DataTable({
    data: tableData,
    columns: [
      // {
      //   title:
      //     '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Parcel ID</label></div>',
      //   data: 'custom_id',
      //   render: function (data, type, row, meta) {
      //     return `<div class="datatable-item-container"><div class="datatable-item-title">
      //           <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
      //           </div></div>`;
      //   },
      // },
      {
        title: '<label class="datatable-header-title">ID</label>',
        data: 'custom_id',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
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
        title: '<label class="datatable-header-title">Parcel Status</label>',
        data: 'parcel_status_data',
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
              <div class="badge-rounded-success">
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
              <div class="badge-rounded-danger">
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
        title: '<label class="datatable-header-title">Remarks</label>',
        data: 'remarks',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${
            data ? data : '-'
          }</div></div>`;
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

var inputTrackingNumber = document.getElementById('input-tracking-number');
var inputParcelContent = document.getElementById('input-parcel-content');
var inputParcelValue = document.getElementById('input-parcel-value');
var inputWeight = document.getElementById('input-parcel-weight');
var inputRemarks = document.getElementById('input-remarks');

document
  .getElementById('add-new-parcel-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    let useBtn = document.querySelector('#add-new-parcel-submit-btn');
    let defaultBtnText = useBtn.innerHTML;

    useBtn.disabled = true;
    useBtn.innerHTML = `${spinner} ${useBtn.innerHTML}`;

    const options = {
      body: JSON.stringify({
        tracking_number: inputTrackingNumber.value,
        content: inputParcelContent.value,
        value: inputParcelValue.value,
        weight: inputWeight.value,
        remarks: inputRemarks.value,
      }),
    };

    fetchAPI(
      'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/parcel',
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
          if (tableData.length !== 0) {
            $('#example').DataTable().row.add(data.new_parcel).draw().node();
          } else {
            getParcelList();
          }
          $('#newParcelModal').modal('hide');
          showToast(
            'alert-toast-container',
            'New parcel added successfully!',
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

function getParcelList() {
  fetchAPI(
    'https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/parcel',
    'GET',
    token,
    null
  )
    .then((data) => {
      if (data?.message) {
        showToast('alert-toast-container', data.message, 'danger');
        tableLoader.style.display = 'none';
      } else {
        if (data.parcel_list.length > 0) {
          tableData = data.parcel_list;
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

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var code = urlParams.get('code');
  if (code === 'new') {
    $('#newParcelModal').modal('show');
  }
  getParcelList();
});
