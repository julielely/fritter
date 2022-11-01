/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

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
