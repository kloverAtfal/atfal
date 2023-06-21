function sidebarNavigation(pageName, callback) {
  return `<div>
   <div class="sidebarnavigation-sidebarnavigation">
     <div class="sidebarnavigation-content">
       <div class="sidebarnavigation-nav">
         <div class="sidebarnavigation-header">
           <div class="sidebarnavigation-logo">
             <div class="sidebarnavigation-logowrap">
               <div class="sidebarnavigation-logomark">
                 <img
                   alt="Frame1I5236"
                   src="public/external/frame1i5236-aiyo.svg"
                   class="sidebarnavigation-frame1"
                 />
               </div>
               <img
                 alt="LogotypeI5236"
                 src="public/external/logotypei5236-1fz.svg"
                 class="sidebarnavigation-logotype"
               />
             </div>
           </div>
         </div>
         <div class="sidebarnavigation-search">
           <div class="sidebarnavigation-inputdropdown">
             <div class="sidebarnavigation-inputwithlabel">
               <div class="sidebarnavigation-input">
                 <div class="sidebarnavigation-content1">
                   <img
                     alt="searchlgI5236"
                     src="public/external/searchlgi5236-p0fh.svg"
                     class="sidebarnavigation-searchlg"
                   />
                   <span class="sidebarnavigation-text TextmdRegular">
                     <span>Search</span>
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="sidebarnavigation-navigation">
          <a href="home-dashboard-user.html" class="sidebarnavigation-navlink">
          <div class="${
            pageName == 'home'
              ? 'sidebarnavigation-frame-navitembase'
              : 'sidebarnavigation-frame-navitembase1'
          }">
             <div class="sidebarnavigation-content2">
               <img
                 alt="homelineI5236"
                 src="public/external/homelinei5236-pi1s.svg"
                 class="sidebarnavigation-homeline"
               />
               <span class="sidebarnavigation-text02 TextmdSemibold">
                 <span>Home</span>
               </span>
             </div>
           </div>
           </a>
           <a href="parcel-dashboard.html" class="sidebarnavigation-navlink">
             <div class="${
               pageName == 'parcel'
                 ? 'sidebarnavigation-frame-navitembase'
                 : 'sidebarnavigation-frame-navitembase1'
             }">
               <div class="sidebarnavigation-content3">
                 <img
                   alt="packageI5236"
                   src="public/external/packagei5236-2yjj.svg"
                   class="sidebarnavigation-package"
                 />
                 <span class="sidebarnavigation-text04 TextmdSemibold">
                   <span>Parcel</span>
                 </span>
               </div>
             </div>
           </a>
           <a href="shipment-dashboard.html" class="sidebarnavigation-navlink1">
           <div class="${
             pageName == 'shipment'
               ? 'sidebarnavigation-frame-navitembase'
               : 'sidebarnavigation-frame-navitembase1'
           }">
               <div class="sidebarnavigation-content4">
                 <img
                   alt="planeI5236"
                   src="public/external/planei5236-zdu.svg"
                   class="sidebarnavigation-plane"
                 />
                 <span class="sidebarnavigation-text06 TextmdSemibold">
                   <span>Shipment</span>
                 </span>
               </div>
             </div>
           </a>
           <a
             href="transaction-dashboard-alipay-top-up.html"
             class="sidebarnavigation-navlink2"
           >
           <div class="${
             pageName == 'transaction'
               ? 'sidebarnavigation-frame-navitembase'
               : 'sidebarnavigation-frame-navitembase1'
           }">
               <div class="sidebarnavigation-content5">
                 <img
                   alt="banknote01I5236"
                   src="public/external/banknote01i5236-cpa.svg"
                   class="sidebarnavigation-banknote01"
                 />
                 <span class="sidebarnavigation-text08 TextmdSemibold">
                   <span>Transactions</span>
                 </span>
               </div>
             </div>
           </a>
           <a
             href="affiliates-dashboard.html"
             class="sidebarnavigation-navlink3"
           >
           <div class="${
             pageName == 'affiliates'
               ? 'sidebarnavigation-frame-navitembase'
               : 'sidebarnavigation-frame-navitembase1'
           }">
               <div class="sidebarnavigation-content6">
                 <img
                   alt="users01I5236"
                   src="public/external/users01i5236-f4q.svg"
                   class="sidebarnavigation-users01"
                 />
                 <span class="sidebarnavigation-text10 TextmdSemibold">
                   <span>Affiliates</span>
                 </span>
               </div>
             </div>
           </a>
         </div>
       </div>
       <div class="sidebarnavigation-footer">
         <div class="sidebarnavigation-navigation1">
           <a href="settings-my-profile.html" class="sidebarnavigation-navlink4">
           <div class="${
             pageName == 'settings'
               ? 'sidebarnavigation-frame-navitembase'
               : 'sidebarnavigation-frame-navitembase1'
           }">
               <div class="sidebarnavigation-content7">
                 <img
                   alt="settings01I5236"
                   src="public/external/settings01i5236-dwy.svg"
                   class="sidebarnavigation-settings01"
                 />
                 <span class="sidebarnavigation-text12 TextmdSemibold">
                   <span>Settings</span>
                 </span>
               </div>
             </div>
           </a>
         </div>
         <a class="sidebarnavigation-navlink5" id="sidebar-logout-btn">
           <div class="sidebarnavigation-account">
             <div class="sidebarnavigation-avatarlabelgroup">
               <div class="sidebarnavigation-avatar"></div>
               <div class="sidebarnavigation-textandsupportingtext">
                 <span class="sidebarnavigation-text14 TextsmSemibold">
                   <span id="sidebar-username">...</span>
                 </span>
                 <span class="sidebarnavigation-text16">
                   <span id="sidebar-email">...</span>
                 </span>
               </div>
             </div>
             <button class="sidebarnavigation-button" >
               <img
                 alt="logout01I5236"
                 src="public/external/logout01i5236-ixha.svg"
                 class="sidebarnavigation-logout01"
               />
             </button>
           </div>
         </a>
       </div>
     </div>
   </div>
 </div>
 `;

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
