/* global done:false */
/* global error:false */
/* global PaymentRequest:false */

/**
 * Launches payment request that does not require shipping.
 */
function onBuyClicked() {  // eslint-disable-line no-unused-vars
  var supportedInstruments = [
    'https://android.com/pay', 'visa', 'mastercard', 'amex', 'discover',
    'maestro', 'diners', 'jcb', 'unionpay'
  ];

  var details = {
    total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'USD', value: '65.00'}
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'USD', value: '-10.00'}
      }
    ]
  };

  var options = null;

  var schemeData = {
    'https://android.com/pay': {
      'gateway': 'stripe',
      'stripe:publishableKey': 'pk_test_VKUbaXb3LHE7GdxyOBMNwXqa',
      'stripe:version': '2015-10-16 (latest)'
    }
  };

  if (!window.PaymentRequest) {
    error('PaymentRequest API is not supported.');
    return;
  }

  try {
    var request =
        new PaymentRequest(supportedInstruments, details, options, schemeData);
    request.show()
        .then(instrumentResponse => {
          window.setTimeout(() => {
            instrumentResponse.complete(true)
                .then(() => {
                  done(
                      'Thank you!', request.shippingAddress,
                      request.shippingOption, instrumentResponse.methodName,
                      instrumentResponse.details);
                })
                .catch(err => {
                  error(err.message);
                });
          }, 2000);
        })
        .catch(err => {
          error(err.message);
        });
  } catch (e) {
    error('Developer mistake: \'' + e.message + '\'');
  }
}