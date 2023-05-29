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




