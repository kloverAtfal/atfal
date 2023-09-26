function header(pageName, callback) {
  return `
  <nav class="navbar navbar-expand-sm fixed-top navbar-light">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <span class="mr-3">
        <img
          alt="Frame1I5318"
          src="public/external/frame1i5318-17h8.svg"
          class="log-in-frame1"
        />
        <img
          alt="LogotypeI5318"
          src="public/external/logotypei5318-so1.svg"
          class="log-in-logotype"
        /> </span
    ></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar1"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar1">
      <ul class="navbar-nav">
        <li class="nav-item ${pageName == 'index' ? 'active' : ''}">
          <a class="nav-link font-white" href="index.html"
            ><span class="">Home</span></a
          >
        </li>
        <li class="nav-item ${pageName == 'about-us' ? 'active' : ''}">
          <a class="nav-link" href="about-us.html"
            ><span class="">About Us</span></a
          >
        </li>
        <li class="nav-item ${pageName == 'services' ? 'active' : ''}">
          <a class="nav-link" href="services.html"
            ><span class="">Services</span></a
          >
        </li>
        <li class="nav-item ${pageName == 'pricing' ? 'active' : ''}">
          <a class="nav-link" href="pricing.html"
            ><span class="">Pricing</span></a
          >
        </li>
        <li class="nav-item ${pageName == 'career' ? 'active' : ''}">
          <a class="nav-link" href="career.html"
            ><span class="">Careers</span></a
          >
        </li>
        <li class="nav-item ${pageName == 'help' ? 'active' : ''}">
          <a class="nav-link" href="help.html"
            ><span class="">Help</span></a
          >
        </li>
        <li class="nav-item ${pageName == 'contact' ? 'active' : ''}">
          <a class="nav-link" href="contact.html"
            ><span class="">Contact</span></a
          >
        </li>
      </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mr-3 ${pageName == 'log-in' ? 'active' : ''}">
          <a class="nav-link font-white" id="log-in-nav-btn"
            ><span class="">Log in</span></a
          >
        </li>
        <li class="nav-item">
          <button
            type="submit"
            class="btn btn-warning atfal-primary-btn"
            id="sign-up-nav-btn"
          >
            Sign up
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  `;
}

function footer(pageName, callback) {
  return `
  <footer>
<div class="row justify-content-between">
  <div>
    <div class="mb-3">
      <img
        alt="Frame1I5298"
        src="public/external/frame1i5298-n1zj.svg"
      />
      <img
        alt="LogotypeI5298"
        src="public/external/logotypei5298-ne7.svg"
      />
    </div>
    <ul class="nav">
      <li class="nav-item">
        <a href="index.html" class="nav-link px-2 text-muted">Home</a>
      </li>
      <li class="nav-item">
        <a href="about-us.html" class="nav-link px-2 text-muted"
          >About Us</a
        >
      </li>
      <li class="nav-item">
        <a href="services.html" class="nav-link px-2 text-muted"
          >Services</a
        >
      </li>
      <li class="nav-item">
        <a href="pricing.html" class="nav-link px-2 text-muted"
          >Pricing</a
        >
      </li>
      <li class="nav-item">
        <a href="career.html" class="nav-link px-2 text-muted"
          >Careers</a
        >
      </li>
      <li class="nav-item">
        <a href="help.html" class="nav-link px-2 text-muted">Help</a>
      </li>
      <li class="nav-item">
        <a href="contact.html" class="nav-link px-2 text-muted"
          >Contact</a
        >
      </li>
    </ul>
  </div>
  <div class="col justify-content-end d-flex">
    <form id="add-subscribe-form">
      <h5>Stay up to date</h5>
      <div class="d-flex flex-column flex-sm-row w-100 gap-2">
          <div class="form-group">
            <div class="d-flex">
              <input
                maxlength="50"
                type="email"
                class="form-control form-input"
                id="input-subscribe-email"
                placeholder="Enter your email"
                required
              />
              <button
                class="btn btn-warning atfal-primary-btn d-flex align-items-center ml-2"
                type="submit"
                id="submit-subscribe-button"
              >
                Subscribe
              </button>
            </div>
            <small class="text-muted"
              >We care about your data in our privacy policy.</small
            >
          </div>
      </div>
    </form>
  </div>
</div>
<div
  class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4 border-top"
>
  <ul class="nav">
    <li class="nav-item">
      <a href="#" class="nav-link px-2 text-muted">
        © 2023 Atfal. All rights reserved.</a
      >
    </li>
    <!-- <li class="nav-item">
      <a href="terms.html" class="nav-link px-2 text-muted">Terms</a>
    </li>
    <li class="nav-item">
      <a href="terms.html" class="nav-link px-2 text-muted">Privacy</a>
    </li>
    <li class="nav-item">
      <a href="terms.html" class="nav-link px-2 text-muted">Cookies</a>
    </li> -->
  </ul>
  <ul class="nav">
    <li class="nav-item">
      <a href="terms.html" class="nav-link px-2 text-muted">Terms</a>
    </li>
    <li class="nav-item">
      <a href="terms.html" class="nav-link px-2 text-muted">Privacy</a>
    </li>
    <li class="nav-item">
      <a href="terms.html" class="nav-link px-2 text-muted">Cookies</a>
    </li>
  </ul>
</div>
</footer>
  `;
}

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
      <img id="sidebar-profile-image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" class="rounded-circle mr-2" style="width: 35px; height: 35px"
      alt="Avatar" />
        <div class="sidebarnavigation-text14 TextsmSemibold mr-2">
          <span id="sidebar-username">...</span>
          <span class="sidebarnavigation-text16 small" id="sidebar-email" style=" display: inline-block; /* Make the text a block element */
          width: 150px; /* Set the width of the container */
          white-space: nowrap; /* Prevent text from wrapping */
          overflow: hidden; /* Hide any overflowing text */
          text-overflow: ellipsis; /"
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
