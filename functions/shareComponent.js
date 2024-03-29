function header(pageName, callback) {
  return `
  <nav class="navbar navbar-expand-sm fixed-top navbar-light" style="background-color: rgba(
    240,
    240,
    240,
    0.5
  ); 
  backdrop-filter: blur(
    20px
  ); ">
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

function sidebarNavigation(pageName, userRole = null) {
  return `<div
  id="sidebar"
  class="d-flex flex-column flex-shrink-0"
  style="width: 280px; height: 100%;"
>
  <a
    href="index"
    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
  >
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
  </a>

  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item ${pageName == 'home' ? 'active' : ''}">
      <a
        href="home-dashboard-user.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    <li class="nav-item ${pageName == 'parcel' ? 'active' : ''}">
      <a
        href="parcel-dashboard.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    <li class="nav-item ${pageName == 'shipment' ? 'active' : ''}">
      <a
        href="shipment-dashboard.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    <li class="nav-item ${pageName == 'transaction' ? 'active' : ''}">
      <a
        href="transaction-dashboard.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    <li class="nav-item ${pageName == 'affiliates' ? 'active' : ''}">
      <a
        href="affiliates-dashboard.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    <li class="nav-item ${pageName == 'settings' ? 'active' : ''}">
      <a
        href="settings-my-profile.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    ${
      userRole == 2
        ? `
    <li class="nav-item ${pageName == 'admin' ? 'active' : ''}">
      <a
        href="admin-dashboard.html"
        class="d-flex"
        style="text-decoration: none"
      >
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
    `
        : ''
    }
    <li class="nav-item flex-column border-top" style="position: fixed;
    bottom: 0; width: 250px">
      <a
        id="sidebar-logout-btn"
        class="d-flex"
        style="text-decoration: none;"
      >
        <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        width="32"
        height="32"
        class="rounded-circle me-2 mt-2"
        id="sidebar-profile-image"
      />
        <div class="sidebarnavigation-text02 TextmdSemibold text-truncate">
          <span id="sidebar-username">...</span>
         <br />
          <span class="sidebarnavigation-text16 small" id="sidebar-email">...</span>
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
</div>`;
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
          <input
          type="text"
          class="form-control form-input"
          id="input-parcel-id"
          placeholder=""
          hidden
        />
          <div class="form-group">
          <label class="form-label">Parcel ID</label>
          <input
            type="text"
            class="form-control form-input"
            id="input-parcel-custom-id"
            placeholder=""
            disabled
            required
          </div>
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
  return `<div
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
          <input
            type="text"
            class="form-control form-input"
            id="input-shipping-id"
            placeholder=""
            hidden
          />
          <div class="form-group">
            <label class="form-label">Shipping ID</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-shipping-custom-id"
              placeholder=""
              disabled
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Shipping Price (MYR)</label>
            <input
              type="number"
              step="0.01"
              class="form-control form-input"
              id="input-shipping-price"
              placeholder=""
            />
          </div>
          <div class="form-group mt-3">
            <label class="form-label">Shipping Fee (%)</label>
            <input
              type="number"
              step="0.01"
              class="form-control form-input"
              id="input-shipping-fee"
              placeholder=""
              disabled
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
          <div class="form-group">
            <label class="form-label">Allow to pay</label>
            <select
              class="form-control"
              id="input-select-allow-to-pay"
              required
            ></select>
          </div>
          <div class="form-group">
            <label class="form-label">Total (RM)</label>
            <div>
              <h1 id="total-price-shipment" class="text-overflow">
                0.00
              </h1>
            </div>
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
</div>`;
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
          <input
            type="text"
            class="form-control form-input"
            id="input-transaction-id"
            placeholder=""
            hidden
          />
          <div class="form-group">
            <label class="form-label">Transaction ID</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-transaction-custom-id"
              placeholder=""
              disabled
              required
            />
          </div>
          <div class="form-group">
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

function editPayoutModal() {
  return `<div
  class="modal fade"
  id="editPayoutModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Payout</h5>
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form id="edit-payout-form">
        <div class="modal-body">
          <input
            type="text"
            class="form-control form-input"
            id="input-payout-user-id"
            placeholder=""
            hidden
          />
          <div class="form-group">
            <label class="form-label">Username</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-payout-username"
              placeholder=""
              disabled
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Total Pending Payout</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-total-pending-payout"
              placeholder=""
              disabled
              required
            />
          </div>
          <hr/>
          <label class="form-label">Please make the payment using the given details and after the payment is completed, please submit the proof of payment.</label>
          <div class="form-group">
            <label class="form-label">Bank name</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-bank-name-payout"
              disabled
              placeholder=""
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label"
              >Bank account holder's name</label
            >
            <input
              type="text"
              class="form-control form-input"
              id="input-bank-account-holder-name-payout"
              disabled
              placeholder=""
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Bank account number</label>
            <input
              type="number"
              class="form-control form-input"
              id="input-bank-account-number-payout"
              disabled
              placeholder=""
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Amount Paid (RM)</label>
            <input
              type="number"
              step="0.01"
              class="form-control form-input"
              id="input-amount-to-pay-payout"
              placeholder=""
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Proof of Payment</label>
            <div class="card unselected-card" id="payout-file-upload">
              <div class="card-body">
                <div
                  class="form-group align-items-center d-flex row text-center"
                  style="justify-content: center"
                >
                  <div class="icon-bg mb-3">
                    <img
                      alt="uploadcloud02I5295"
                      src="public/external/uploadcloud02i5295-7zm.svg"
                      class="settings-my-profile-uploadcloud02"
                    />
                  </div>
                  <div>
                    <span class="selected-card-text"
                      >Click to upload
                    </span>
                    <label class="form-label">or drag and drop</label>
                    <label class="form-label"
                      >SVG, PNG, JPG or GIF (max. 800x400px)</label
                    >
                    <label
                      class="form-label"
                      id="payout-text-file-upload-name"
                    ></label>
                    <div class="text-center">
                      <img
                        src="..."
                        class="rounded img-thumbnail"
                        alt="..."
                        id="payout-preview-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            id="edit-payout-submit-btn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>`;
}

function editUserModal() {
  return `<div
  class="modal fade"
  id="editUserModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">More</h5>
        <button
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form id="edit-user-form">
        <div class="modal-body">
          <input
            type="text"
            class="form-control form-input"
            id="input-user-user-id"
            placeholder=""
            hidden
          />
          <div class="form-group">
            <label class="form-label">Username</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-user-username"
              placeholder=""
              disabled
            />
          </div>
          <div class="form-group">
            <label class="form-label">Role</label>
            <select
              class="form-control"
              id="input-select-user-role"
              required
            ></select>
          </div>
          <div class="form-group">
            <label class="form-label">Blue Wing Id</label>
            <input
              type="text"
              class="form-control form-input"
              id="input-user-blue-wing-id"
              placeholder=""
            />
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
            id="edit-user-submit-btn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>`;
}

function editCareerModal(typeName = '') {
  return `
  <div
    class="modal fade"
    id="${typeName}CareerModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${
            typeName == 'add' ? 'Add' : 'Edit'
          } Career</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <form id="${typeName}-career-form">
          <div class="modal-body">
            <input
            type="text"
            class="form-control form-input"
            id="input-${typeName}-career-id"
            placeholder=""
            hidden
            />
            <div class="form-group">
              <label class="form-label">Title</label>
              <input
                type="text"
                class="form-control form-input"
                id="input-${typeName}-career-title"
                placeholder=""
                maxlength="100"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea
                class="form-control form-input"
                id="input-${typeName}-career-description"
                rows="3"
                required
                maxlength="1000"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Type</label>
              <input
                type="text"
                class="form-control form-input"
                id="input-${typeName}-career-type"
                placeholder=""
                required
                maxlength="30"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input
                type="text"
                class="form-control form-input"
                id="input-${typeName}-career-location"
                placeholder=""
                required
                maxlength="50"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-danger"
              type="button"
              style="display: ${typeName == 'edit' ? 'block' : 'none'};"
              id="${typeName}-career-delete-btn"
            >
              Delete
            </button>
            <div class="ml-auto">
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
                id="${typeName}-career-submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}

function addApplicationModal() {
  return `
  <div
    class="modal fade"
    id="addApplicationModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Application</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <form id="add-application-form">
          <div class="modal-body">
            <input
              type="text"
              class="form-control form-input"
              id="input-application-id"
              placeholder=""
              hidden
              required
            />
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input
                type="text"
                class="form-control form-input"
                id="input-application-name"
                placeholder=""
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input
                type="text"
                class="form-control form-input"
                id="input-application-phone-number"
                placeholder=""
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control form-input"
                id="input-application-email"
                placeholder=""
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">About Me</label>
              <textarea
                class="form-control form-input"
                id="input-application-about-me"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Linkedin Profile URL</label>
              <input
                type="url"
                class="form-control form-input"
                id="input-application-linkin-profile-url"
                placeholder=""
              />
            </div>
          </div>
          <div class="modal-footer">
            <div class="ml-auto">
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
                id="add-application-submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>`;
}
