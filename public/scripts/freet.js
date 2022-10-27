/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFreets(fields) {
  fetch('/api/freets')
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  fetch(`/api/freets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

/* MERCHANTFREETS */
function viewAllMerchantFreets(fields) {
  fetch(`/api/freets/merchantFreets?listingStatus=${fields.listingStatus}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewMerchantFreetsByAuthor(fields) {
  fetch(`/api/freets/merchantFreets?author=${fields.merchantAuthor}&listingStatus=${fields.listingStatus}`)
    .then(showResponse)
    .catch(showResponse);
}

function purchaseMerchantFreet(fields) {
  fetch(`/api/freets/merchantFreets/purchase/${fields.id}`, {method: 'PATCH', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

// view feed
function viewFeed(fields) {
  fetch('/api/freets/feed')
    .then(showResponse)
    .catch(showResponse);
}

// view archived freets
function viewArchived(fields) {
  fetch('/api/freets/archived')
    .then(showResponse)
    .catch(showResponse);
}

/// archived/:freetId?'
function archiveFreet(fields) {
  fetch(`/api/freets/archived/${fields.id}`, {method: 'PATCH', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}


/* FRITTERPAY */
function viewAllFritterPay(fields) {
  fetch('/api/users/fritterPay')
    .then(showResponse)
    .catch(showResponse);
}

function viewAllFritterPayByAuthor(fields) {
  fetch(`/api/users/fritterPay?author=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFritterPay(fields) {
  fetch('/api/user/fritterPay', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFritterPay(fields) {
  fetch(`/api/user/fritterPay/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFritterPay(fields) {
  fetch(`/api/user/fritterPay/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
