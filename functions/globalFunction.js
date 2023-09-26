// example how to use
/* <div id="alert-login-container">
<!-- show alert body here -->
</div> */
// showAlert("alert-login-container", "Error!", data.message, "danger", "my-login-alert");

function formatDateRange(data) {
  if (data.length === 0) {
    return ''; // Return empty string if there is no data
  }

  // Sort the data array based on the 'created_at' property in ascending order
  data.sort((a, b) => a.created_at - b.created_at);

  // Get the first and last timestamps from the sorted data array
  const startDate = new Date(data[0].created_at);
  const endDate = new Date(data[data.length - 1].created_at);

  // Format the start and end dates
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const startYear = startDate.getFullYear();
  const endMonth = endDate.toLocaleString('default', { month: 'short' });
  const endYear = endDate.getFullYear();

  // Construct and return the formatted date range string
  if (data.length === 1) {
    return `${startMonth} ${startYear}`;
  } else {
    return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
  }
}

function formatNumber(number) {
  return (number / 100).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const spinner = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>`;

const momentFormat = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  // hour: "numeric",
  // minute: "numeric",
  // hour12: true,
};

function formatDate(date) {
  if (date) {
    let fDate = new Date(date);
    var newDate = fDate.toLocaleString('en-US', momentFormat);
    return newDate;
  } else {
    return '-';
  }
}

function maskText(text) {
  if (text) {
    return text.substring(0, 4) + '*'.repeat(text.length - 4);
  } else {
    return '-';
  }
}

function formatPrice(price) {
  // example 1600 to RM 16,00;
  const formattedPrice = (price / 100).toLocaleString('en-MY', {
    style: 'currency',
    currency: 'MYR',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
  });
  return formattedPrice;
}

function showAlert(
  parentContainerId = '',
  strong = '',
  message,
  type = '',
  id = '',
  timeOut = 7000
) {
  const alertContainer = document.getElementById(parentContainerId);
  const alertHTML = `
          <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert" id="${id}">
            <strong>${strong}</strong> ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `;
  alertContainer.innerHTML = alertHTML;

  $(`#${id}`).show();
  $(`#${id}`)
    .fadeTo(timeOut, 500)
    .slideUp(500, function () {
      $(`#${id}`).slideUp(500);
    });
}

function showToast(parentContainerId = '', message, type = '') {
  const toastContainer = document.getElementById(parentContainerId);
  const alertHTML = `
        <div class="toast toast-container align-items-center text-white bg-${type} border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style="position: fixed; top: 20px; right: 20px; z-index: 9999"
        >
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button
            type="button"
            class="close mr-2"
            aria-label="Close"
            data-dismiss="toast"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        </div>
        `;
  toastContainer.innerHTML = alertHTML;

  $('.toast').toast({
    autohide: true,
    delay: 10000, // Set the toast to disappear after 10 seconds
  });
  $('.toast').toast('show');
}

function rateLimitButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.disabled = true;
  setTimeout(function () {
    button.disabled = false;
  }, 1000);
}

// function clearSession(event) {
//     event.preventDefault();
//     window.localStorage.removeItem('authToken');
//     // window.location.reload();
//     location.href = "/index.html"
// }

function generateUniqueID() {
  // Generate a long, unique number using the current time
  const timestamp = Date.now();

  // Convert the timestamp to a string
  const timestampString = timestamp.toString();

  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Round down the random number to the nearest integer
  const randomInteger = Math.floor(randomNumber);

  // Convert the integer to a string and return the first 7 characters
  const randomString = randomInteger.toString().substring(0, 7);

  // Concatenate the timestamp string and the random string
  return timestampString + randomString;
}

function clearSession() {
  // clear session data, such as removing the token from local storage
  localStorage.removeItem('masterData');
  // redirect user to login page
  window.location.href = '/index';
}

function disableButton(button, text, toggle) {
  button.value = text;
  button.disabled = toggle;
}

function saveData(key, data) {
  // Convert the data to JSON
  const jsonData = JSON.stringify(data);

  // Save the data to localStorage using the provided key
  localStorage.setItem(key, jsonData);
}

/*
    // Set the key for the saved data
    const key = 'savedData';
    
    // Set the data to save
    const data = {
      key: 'value',
    };
    
    // Use the saveData() function to save the data
    saveData(key, data);
    */

function getSavedData(key) {
  // Check if the key exists in localStorage
  if (localStorage.getItem(key)) {
    // If the key exists, get the value from localStorage
    const data = localStorage.getItem(key);

    // Parse the data from JSON to JavaScript objects
    return JSON.parse(data);
  } else {
    // If the key does not exist, return null
    return null;
  }
}

/*
    // Set the key for the saved data
    const key = 'savedData';
    
    // Use the getSavedData() function to get the saved data
    const data = getSavedData(key);
    */

const currentUrl = window.location.pathname.substring(
  window.location.pathname.lastIndexOf('/')
);
const excludedPages = ['/index', '/sign-up', '/log-in'];

if (!excludedPages.includes(currentUrl)) {
  window.onload = function () {
    const myData = getSavedData('masterData');
    const token = myData.authToken;
    if (token == null) {
      alert('You are not logged in. Please log in and try again');
      location.href = 'index';
    }
  };
}

const myData = getSavedData('masterData');
const token = myData?.authToken;
