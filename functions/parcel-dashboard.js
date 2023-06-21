if (!token) {
  location.href = 'index';
}

function sidebarNavigationLoaded() {
  document.getElementById('body-content').style.display = 'block';
  document.getElementById('logout-modal-container').innerHTML = logoutModal();
}

document.getElementById('sidebar-navigation').innerHTML = sidebarNavigation(
  'parcel',
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

document.getElementById('add-new-parcel-btn').addEventListener('click', () => {
  // location.href = 'parcel-add-new-parcel';
  $('#newParcelModal').modal('show');
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

let tableData = [];

function populateToTable(data) {
  // updateTotals(data);

  // initialize Datatables with your table and column definitions
  const table = $('#example').DataTable({
    data: tableData,
    columns: [
      {
        title:
          '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="checkAll"/><label class="datatable-header-title" for="flexCheckDefault">Tracking Number</label></div>',
        data: 'tracking_number',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">
                <div class="form-check"><input class="form-check-input" type="checkbox" value="${data}" id="checkItem" />${data}</div></div>
                </div></div>`;
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
        data: 'note',
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">${data}</div></div>`;
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
        title: '<label class="datatable-header-title">Status</label>',
        data: 'parcel_status_data.code',
        render: function (data, type, row, meta) {
          if (data == 'waiting') {
            return `<div class="parcel-dashboard-tablecell40">
            <div class="parcel-dashboard-badge08">
              <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="parcel-dashboard-check06">
              <span class="parcel-dashboard-text098 TextxsMedium">
                <span>${data}</span>
              </span>
            </div>
          </div>`;
          }
          if (data == 'arrived') {
            return `<div class="parcel-dashboard-tablecell40">
                        <div class="parcel-dashboard-badge08">
                          <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="parcel-dashboard-check06">
                          <span class="parcel-dashboard-text098 TextxsMedium">
                            <span>${data}</span>
                          </span>
                        </div>
                      </div>`;
          }
          if (data.code == 'shipped') {
            return `<div class="parcel-dashboard-tablecell40">
            <div class="parcel-dashboard-badge08">
              <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="parcel-dashboard-check06">
              <span class="parcel-dashboard-text098 TextxsMedium">
                <span>${data}</span>
              </span>
            </div>
          </div>`;
          } else {
            return `<div class="parcel-dashboard-tablecell40">
            <div class="parcel-dashboard-badge08">
              <img alt="checkI5296" src="public/external/checki5296-srbj.svg" class="parcel-dashboard-check06">
              <span class="parcel-dashboard-text098 TextxsMedium">
                <span>${data}</span>
              </span>
            </div>
          </div>`;
          }
        },
      },
      {
        title: '<label class="datatable-header-title">Action</label>',
        data: 'id',
        orderable: false, // disable sorting for this column
        render: function (data, type, row, meta) {
          return `<div class="datatable-item-container"><div class="datatable-item-title">

          <div class="parcel-dashboard-tablecell48">
                        <a class="parcel-dashboard-button03">
                          <img alt="eyeI5296" src="public/external/eyei5296-tnpl.svg" class="parcel-dashboard-eye">
                        </a>
                        <a onclick="deleteTracking(${data}, this)" class="parcel-dashboard-button04">
                          <img alt="trash01I5296" src="public/external/trash01i5296-x52rd.svg" class="parcel-dashboard-trash01">
                        </a>
                        <a onclick="editParcel(${data}, this)" class="parcel-dashboard-button05">
                          <img alt="edit01I5296" src="public/external/edit01i5296-lv4a.svg" class="parcel-dashboard-edit01">
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
        tableData = data.parcel_list;
        populateToTable();
      }
    })
    .catch((error) => {
      tableLoader.style.display = 'none';
      console.log('error', error);
    });
}

var inputTrackingNumber = document.getElementById('input-tracking-number');
var inputParcelContent = document.getElementById('input-parcel-content');
var inputParcelValue = document.getElementById('input-parcel-value');
var inputLength = document.getElementById('input-parcel-length');
var inputWidth = document.getElementById('input-parcel-width');
var inputHeight = document.getElementById('input-parcel-height');
var inputWeight = document.getElementById('input-parcel-weight');
var inputName = document.getElementById('input-name');
var inputEmail = document.getElementById('input-email');
var inputPhoneNumber = document.getElementById('input-phone-number');
var inputRemark = document.getElementById('input-remark');

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
        length: inputLength.value,
        width: inputWidth.value,
        height: inputHeight.value,
        weight: inputWeight.value,
        name: inputName.value,
        email: inputEmail.value,
        phone: inputPhoneNumber.value,
        note: inputRemark.value,
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
          $('#newParcelModal').modal('hide');
          $('#example').DataTable().row.add(data.new_parcel).draw().node();
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

getParcelList();
