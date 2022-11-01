/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */


/* FRITTERPAY */
function viewAllFritterPay(fields) {
  fetch('/api/fritterPay')
    .then(showResponse)
    .catch(showResponse);
}

function viewAllFritterPayByAuthor(fields) {
  fetch(`/api/fritterPay?author=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFritterPay(fields) {
  fetch('/api/fritterPay', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFritterPay(fields) {
  fetch(`/api/fritterPay/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFritterPay(fields) {
  fetch(`/api/fritterPay/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
