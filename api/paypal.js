const paypal = require("paypal-rest-sdk")
const port = process.env.PORT || 3000
const return_url = process.env.PAYPAL_RETURN_URL || `http://localhost:${port}/store/checkout/thanks`
const cancel_url = process.env.PAYPAL_CANCEL_URL || `http://localhost:${port}/store/checkout`
paypal.configure({
  mode: "sandbox",
  client_id: "ATMKYQa1aWKtz0hXtOKoqyVwBFNymL_vLtw-5yj-gpqOGjga0tBi8rmfQhEuPjFbYK2k7JLUSGEezkWw",
  client_secret: "EOW_xX6znUykGPpGjRnVCXbnqBFBSJa2bnSc-2Egd4izyz7rEr993iN3l_5L3rKYw9-gD768TWb83ort",
})

const createPayment = ({ total, items }) => {
  return new Promise((resolve, reject) => {
    const paymentDetails = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url,
        cancel_url,
      },
      transactions: [
        {
          // item_list: {},
          amount: {
            currency: "PHP",
            total,
          },
          description: "Club Seville International purchase",
        }
      ],
    }

    paypal.payment.create(paymentDetails, (err, payment) => {
      if (err) {
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}

const executePayment = (paymentId, payer_id) => {
  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, { payer_id }, (err, payment) => {
      if (err) {
        reject(err)
      } else {
        resolve(payment)
      }
    })
  })
}

module.exports = {
  createPayment,
  executePayment,
}
