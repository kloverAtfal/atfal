window.onload = function() {
    getProductList(1)
}

function getProductList(page = 1) {

    const url = "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/order?";
    const pagination = {
        "page": page
    };
    const fullUrl = url + "pagination=" + encodeURIComponent(JSON.stringify(pagination));
    const token = getSavedData("authToken");
    fetchAPI(fullUrl, 'GET', token)
        .then(data => {
            populateToBuyForMeTable(data.items);
            displayPaginationList(data, 'table-buy-for-me-pagination', 'table-buy-for-me-pagination-column', getProductList)
            savePaginationData(data.curPage,data.pageTotal,'buy-for-me-table')
       
        })
        .catch(error => {
            // Handle any errors here
        });

}

function handleNextPage() { 
    const data = getSavedData('buy-for-me-table');
    if(data.currentPage < data.totalPage){
     getProductList(data.currentPage + 1)
    }
}

function handlePrevPage() { 
    const data = getSavedData('buy-for-me-table');
    if(data.currentPage > 1){
     getProductList(data.currentPage - 1)
    }
}

// get references to the buttons
const nextButton = document.getElementById('table10-buy-for-me-btn-next');
const prevButton = document.getElementById('table10-buy-for-me-btn-prev');

nextButton.addEventListener('click', (e) => handleNextPage(), true);
prevButton.addEventListener('click', (e) => handlePrevPage(), true);


function populateToBuyForMeTable(data) {

    const parentTable = document.getElementById('table-buy-for-me-list');
    const style = document.getElementById('table-buy-for-me-row')
    const emptyDiv = [];

    data.forEach(data => {
        const card = style.cloneNode(true)
        const divs = card.getElementsByTagName('div')
        const orderId = divs[1]
        orderId.textContent = data.id;
        const destination = divs[2]
        destination.textContent = `${data.warehouse_data.short_code} - ${data.destination_data.short_code}`;
        const dateTime = divs[4]
        dateTime.textContent = data.created_at;
        const price = divs[6]
        price.textContent = data.price;
        const weight = divs[8]
        weight.textContent = data.weight;
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

function populateToSelectWarehouse(data) {
    var dropdown = document.getElementById("Contact-Modal-6-Select-5-Warehouse");
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select warehouse';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].warehouse_name;
        option.value = data[i].id;
        dropdown.add(option);
    }
}

function populateToSelectExpressCompany(data) {
    var dropdown = document.getElementById("Contact-Modal-6-Select-3-express-company");
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select Express Company';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].company_name;
        option.value = data[i].id;
        dropdown.add(option);
    }
}

function getWarehouseList() {
    const url = "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/warehouse";
    const token = getSavedData("authToken");

    fetchAPI(url, 'GET', token)
        .then(data => {
            populateToSelectWarehouse(data);
        })
        .catch(error => {
            // Handle any errors here
        });
}

function getExpressCompanyList() {
    const url = "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/express_company";
    const token = getSavedData("authToken");

    fetchAPI(url, 'GET', token)
        .then(data => {
            populateToSelectExpressCompany(data);
        })
        .catch(error => {
            // Handle any errors here
        });
}

function handleApiRequest() {
    event.preventDefault();
    getWarehouseList();
    getExpressCompanyList();
}

const createShipmentBtn = document.getElementById('button-create-shipment');
createShipmentBtn.addEventListener('click', handleApiRequest);

function postShipmentData() {
    const xano_input = {
        warehouse_id: document.getElementById('Contact-Modal-6-Select-5-Warehouse').value,
        product_name: document.getElementById('Contact-Modal-6-Product-Name').value,
        express_company_id: document.getElementById('Contact-Modal-6-Select-3-express-company').value,
        express_number: document.getElementById('Contact-Modal-6-Express-Number').value,
        quantity: document.getElementById('Contact-Modal-6-Product-Quantity').value,
        price: document.getElementById('Contact-Modal-6-Total-Product-Price').value,
        remarks: document.getElementById('Contact-Modal-6-Product-Remark').value
        // You can add other inputs here if you want
    };

    const url = "https://x8ki-letl-twmt.n7.xano.io/api:bQZrLIyT/order";
    const token = getSavedData("authToken");
    const options = {
      body: JSON.stringify(xano_input)
    };
    
    fetchAPI(url, 'POST', token, options)
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => {
            // Handle any errors here
        });

}

function shipmentFormSubmit(event) {
    event.preventDefault();
    postShipmentData()
}

const shipmentForm = document.getElementById('wf-form-Contact-Modal-6-Form');
shipmentForm.addEventListener('submit', shipmentFormSubmit, true);
