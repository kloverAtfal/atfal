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

// const buttonAddParcel = document.getElementById('button-add-parcel');

// function editParcel(parcel_id) {
//   const options = {
//     body: JSON.stringify({
//       parcel_id: parcel_id,
//       tracking_number: inputTrackingNumber.value,
//       content: inputParcelContent.value,
//       value: inputParcelValue.value,
//       length: inputLength.value,
//       width: inputWidth.value,
//       height: inputHeight.value,
//       weight: inputWeight.value,
//       name: inputName.value,
//       email: inputEmail.value,
//       phone: inputPhoneNumber.value,
//       note: inputRemark.value,
//     }),
//   };

//   fetchAPI(
//     `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/parcel/edit`,
//     'POST',
//     token,
//     options
//   )
//     .then((data) => {
//       if (data?.message) {
//         alert(data.message);
//       } else {
//         alert('Successfully updated!');
//         location.href = `parcels`;
//       }
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });
// }

// function fetchParcelData(parcel_id) {
//   fetchAPI(
//     `https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/parcel/${parcel_id}`,
//     'GET',
//     token
//   )
//     .then((data) => {
//       if (data?.message) {
//         alert(data.message);
//       } else {
//         inputTrackingNumber.value = data.tracking_number;
//         inputParcelContent.value = data.content;
//         inputParcelValue.value = data.value;
//         inputLength.value = data.length;
//         inputWidth.value = data.width;
//         inputHeight.value = data.height;
//         inputWeight.value = data.weight;
//         inputName.value = data.name;
//         inputEmail.value = data.email;
//         inputPhoneNumber.value = data.phone;
//         inputRemark.value = data.note;
//       }
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });
// }

// $(document).ready(function () {
//   var urlParams = new URLSearchParams(window.location.search);
//   var parcel_id = urlParams.get('parcel_id');

//   const currentPageName = document.getElementById('current-page-name');

//   if (parcel_id) {
//     fetchParcelData(parcel_id);

//     currentPageName.innerHTML = 'Edit Parcel';
//     buttonAddParcel.innerHTML = `<div class="text-sm-semibold-21">Update Parcel</div>`;
//     buttonAddParcel.addEventListener('click', function () {
//       editParcel(parcel_id);
//     });
//   } else {
//     currentPageName.innerHTML = 'Add Parcel';
//     buttonAddParcel.innerHTML = `<div class="text-sm-semibold-21">Add Parcel</div>`;
//     buttonAddParcel.addEventListener('click', function () {
//       addParcel();
//     });
//   }
// });

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
          showToast(
            'alert-toast-container',
            'New parcel successfully added!',
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
