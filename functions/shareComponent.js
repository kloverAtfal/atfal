function sidebarNavigation(pageName, callback) {
  return `<nav id="sidebar">
  <div class="sidebar-header d-flex">
    <img
      alt="Frame1I5236"
      src="public/external/frame1i5236-aiyo.svg"
      class="mr-2"
    />
    <img
      alt="LogotypeI5236"
      src="public/external/logotypei5236-1fz.svg"
    />
  </div>
  <ul class="list-unstyled components">
    <li class="${pageName == 'home' ? 'active' : ''}">
      <a href="home-dashboard-user.html" class="d-flex" style="text-decoration: none">
        <img
          alt="homelineI5236"
          src="public/external/homelinei5236-pi1s.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Home</span>
        </div>
      </a>
    </li>
    <li class="${pageName == 'parcel' ? 'active' : ''}">
      <a href="parcel-dashboard.html" class="d-flex" style="text-decoration: none">
        <img
          alt="packageI5236"
          src="public/external/packagei5236-2yjj.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Parcel</span>
        </div>
      </a>
    </li>
    <li class="${pageName == 'shipment' ? 'active' : ''}">
      <a href="shipment-dashboard.html" class="d-flex" style="text-decoration: none">
        <img
          alt="planeI5236"
          src="public/external/planei5236-zdu.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Shipment</span>
        </div>
      </a>
    </li>
    <li class="${pageName == 'transaction' ? 'active' : ''}">
      <a href="transaction-dashboard.html" class="d-flex" style="text-decoration: none">
        <img
          alt="banknote01I5236"
          src="public/external/banknote01i5236-cpa.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Transactions</span>
        </div>
      </a>
    </li>
    <li class="${pageName == 'affiliates' ? 'active' : ''}">
      <a href="affiliates-dashboard.html" class="d-flex" style="text-decoration: none">
        <img
          alt="users01I5236"
          src="public/external/users01i5236-f4q.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Team</span>
        </div>
      </a>
    </li>
    <li class="${pageName == 'settings' ? 'active' : ''}">
      <a href="settings-my-profile.html" class="d-flex" style="text-decoration: none">
        <img
          alt="settings01I5236"
          src="public/external/settings01i5236-dwy.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Settings</span>
        </div>
      </a>
    </li>
    <li class="${pageName == 'admin' ? 'active' : ''}">
      <a href="admin-dashboard.html" class="d-flex" style="text-decoration: none">
        <img
          alt="settings01I5236"
          src="public/external/settings01i5236-dwy.svg"
          class="pl-2 mr-2"
        />
        <div class="sidebarnavigation-text02 TextmdSemibold">
          <span>Admin</span>
        </div>
      </a>
    </li>
  </ul>
  <ul class="list-unstyled">
    <li>
      <a id="sidebar-logout-btn" class="d-flex" style="text-decoration: none">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" class="rounded-circle mr-2" style="width: 35px; height: 35px"
      alt="Avatar" />
        <div class="sidebarnavigation-text14 TextsmSemibold mr-2">
          <span id="sidebar-username">...</span>
          <span class="sidebarnavigation-text16 small" id="sidebar-email"
            >...</span
          >
        </div>
        <button class="sidebarnavigation-button btn">
          <img
            alt="logout01I5236"
            src="public/external/logout01i5236-ixha.svg"
            class="sidebarnavigation-logout01"
          />
        </button>
      </a>
    </li>
  </ul>
</nav>`;

  callback();
}

function logoutModal() {
  return `<div
    class="modal fade"
    id="logoutModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirm Logout</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to log out of your account? This action will
          end your current session.
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <a class="btn btn-warning" id="button-logout-yes">Logout</a>
        </div>
      </div>
    </div>
  </div>`;
}

function editParcelModal() {
  return `
  <div
  class="modal fade"
  id="editParcelModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Parcel</h5>
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form id="edit-parcel-form">
        <div class="modal-body">
          <h6 class="modal-title">
          Parcel ID: <strong id="edit-parcel-id">-</strong>
          </h6>
          <div class="form-group mt-3">
            <label class="form-label">Parcel Status</label>
            <select
              class="form-control"
              id="input-select-parcel-status"
              required
            ></select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-warning parcel-add-new-parcel-text53"
            type="submit"
            id="edit-parcel-submit-btn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
`;
}

function editShipmentModal() {
  return `
  <div
  class="modal fade"
  id="editShipmentModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Shipment</h5>
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form id="edit-shipment-form">
        <div class="modal-body">
          <h6 class="modal-title">
          Shipment ID: <strong id="edit-shipment-id">-</strong>
          </h6>
          <div class="form-group mt-3">
          <label class="form-label">Shipping Price</label>
          <input
            type="number"
            class="form-control form-input"
            id="input-shipping-price"
            placeholder=""
           
          />
          </div>
          <div class="form-group">
          <label class="form-label">Shipping Fees</label>
          <input
            type="number"
            class="form-control form-input"
            id="input-shipping-fees"
            placeholder=""
          />
          </div>
          <div class="form-group">
            <label class="form-label">Shipping Status</label>
            <select
              class="form-control"
              id="input-select-shipment-status"
              required
            ></select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-warning parcel-add-new-parcel-text53"
            type="submit"
            id="edit-shipment-submit-btn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
`;
}

function editTransactionModal() {
  return `
  <div
  class="modal fade"
  id="editTransactionModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Transaction</h5>
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form id="edit-transaction-form">
        <div class="modal-body">
          <h6 class="modal-title">
          Transaction ID: <strong id="edit-transaction-id">-</strong>
          </h6>
          <div class="form-group mt-3">
            <label class="form-label">Transaction Status</label>
            <select
              class="form-control"
              id="input-select-transaction-status"
              required
            ></select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            class="btn btn-warning parcel-add-new-parcel-text53"
            type="submit"
            id="edit-transaction-submit-btn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
`;
}
