window.onload = function() {
    getWalletCardList(1)
    retrieveUserData()
    getTransactionData(1)
}

function retrieveUserData(){
    
    const accountId = document.getElementById('user-text-account-id');
    const eWalletAccountNumber = document.getElementById('eWallet-text-account-number');
    
    const userData = getSavedData("userData");
    accountId.textContent = userData.unique_id;
    eWalletAccountNumber.textContent = userData.eWallet_account_number;
    
}

function getWalletCardList() {
  
    const token = getSavedData("authToken");
    fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/ewallet_company", 'GET', token)
        .then(data => {
            populateToWalletCardList(data);
        })
        .catch(error => {
          
        });
  
}

const selectedEwalletCardId = document.createElement('input');
selectedEwalletCardId.setAttribute('type', 'number');

function populateToWalletCardList(data) {
  
    const parentTable = document.getElementById('wallet-card-list-parent');
    const style = document.getElementById('wallet-card-list-child')
  
  	const emptyDiv = [];

    data.forEach(data => {
      const card = style.cloneNode(true);
      const divs = card.getElementsByTagName('div');

      card.addEventListener('click', function() {
        // Set the background color of the clicked card to blue
        card.style.backgroundColor = "#f7c600";
        selectedEwalletCardId.value = data.id;
        const eWalletCompanyName = document.getElementById('eWallet-text-company-name');
        const eWalletFee = document.getElementById('eWallet-text-fee');
        eWalletCompanyName.textContent = data.name;
        eWalletFee.textContent = `${data.fee}%`;

        // Set the background color of all other cards to the default value
        emptyDiv.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.style.backgroundColor = ""; // or some other default value
          }
        });
      });

      const walletName = divs[0];
      walletName.textContent = data.name;
      const walletFee = divs[2];
      walletFee.textContent = `${data.fee}%`;
      const walletImage = card.getElementsByTagName('img')[0]; // Assuming there is only one <img> element
      walletImage.src = data.logo.url;
      emptyDiv.push(card);
    });


    // Remove all old child nodes 
    while (parentTable.firstChild) {
        parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach(item => {
        parentTable.appendChild(item);
    });
}


const eWalletFormAmount = document.getElementById('eWallet-form-amount');
const eWalletTotalAmountYuan = document.getElementById('eWallet-text-total-amount-yuan');
const eWalletTotalAmountRM = document.getElementById('eWallet-text-total-amount-rm');

// Add event listener to eWalletFormAmount that listens for the 'input' event
eWalletFormAmount.addEventListener('input', () => {
  eWalletTotalAmountYuan.textContent = eWalletFormAmount.value;
  eWalletTotalAmountRM.textContent = eWalletFormAmount.value;
});

const eWalletBtnPay = document.getElementById('eWallet-btn-pay');
const eWalletAcceptTnc = document.getElementById('eWallet-checkbox-tnc');

eWalletBtnPay.addEventListener('click', () => {
  event.preventDefault();
  event.stopPropagation();
  postEwalletData()
});

function postEwalletData(){
    
    if(eWalletAcceptTnc.checked && selectedEwalletCardId.value && eWalletFormAmount.value > 0){
        
        const userData = getSavedData("userData");
        
        const options = {
          body: JSON.stringify({
            user_id: userData.id,
            ewallet_company_id: selectedEwalletCardId.value,
            request_amount_to_be_credit: eWalletFormAmount.value,
            is_accept_tnc: eWalletAcceptTnc.checked,
            request_status: 0,
            status_id: 1 // on way
          }),
        };
        
        const token = getSavedData("authToken");
        fetchAPI("https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/top_up", 'POST', token, options)
                .then(data => {
                   eWalletFormAmount.value = 0;
                   eWalletTotalAmountYuan.textContent = eWalletFormAmount.value;
                   eWalletTotalAmountRM.textContent = eWalletFormAmount.value;
                   alert('Submitted successfully!')
                })
                .catch(error => {

         });
    }
}


let curPage = 1;
let pageTotal = null;
let nextPage = null;
let prevPage = null;

function getTransactionData(page) {
  const url = "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/top_up_by_user?";
  const pagination = { "page": page };
  const userData = getSavedData("userData");
  const fullUrl = url + "pagination=" + encodeURIComponent(JSON.stringify(pagination)) + "&user_id=" + encodeURIComponent(JSON.stringify(userData.id));
  const token = getSavedData("authToken");

  fetchAPI(fullUrl, 'GET', token).then(data => {
    curPage = data.curPage;
    pageTotal = data.pageTotal;
    nextPage = data.nextPage;
    prevPage = data.prevPage;
    populateToTransactionTable(data)
    displayPaginationList(data, 'table-transaction-pagination', 'table-transaction-pagination-column', getTransactionData)
  }).catch(error => {});
}

function populateToTransactionTable(rawData) {

	  const data = rawData.items;
    const parentTable = document.getElementById('table-transaction-list');
    const style = document.getElementById('table-transaction-row')
    const emptyDiv = [];

    data.forEach(data => {
        const card = style.cloneNode(true)
        const divs = card.getElementsByTagName('div')
        
        const transId = divs[1]
        transId.textContent = data.id;
      
        const eWalletCompanyName = divs[2]
        eWalletCompanyName.textContent = data.ewallet_company_data.name;
        const dateTime = divs[4]
        dateTime.textContent = data.created_at;
        const price = divs[6]
        price.textContent = data.request_amount_to_be_credit;
        /*const weight = divs[8]
        weight.textContent = data.weight;
        */
        const status = divs[11]
        status.textContent = data.status_data.type;
     

        emptyDiv.push(card)
    })

    // Remove all old child nodes 
    while (parentTable.firstChild) {
        parentTable.removeChild(parentTable.firstChild);
    }

    emptyDiv.forEach(item => {
        parentTable.appendChild(item);
    });
}

document.getElementById('table-transaction-btn-next').addEventListener('click', () => {
   if (nextPage !== null && curPage < pageTotal) {
     curPage++;
     getTransactionData(curPage)
  }
});

document.getElementById('table-transaction-btn-prev').addEventListener('click', () => {
  if (prevPage !== null && curPage > 1) {
     curPage--;
     getTransactionData(curPage)
  }
});





