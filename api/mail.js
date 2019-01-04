const nodemailer = require("nodemailer")

const sendMail = (recipient, orderDetails) => {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        // TEST
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        // PROD
        // host: "smtp.zoho.com",
        // port: 465,
        // secure: true,
        // auth: {
        //   user: "info@clubseville.icu",
        //   pass: "P@ssw0rd",
        // },
      })

      const {
        firstName,
        lastName,
        orderId,
        orderAt,
        shipTo,
        shipMethod,
        payMethod,
        items,
      } = orderDetails
      const mailText = `
        Thank you ${firstName} ${lastName}.
        Reference ID: ${orderId}
        Purchase Date: ${orderAt}
        Shipping Address: ${shipTo}
        Shipping Method: ${shipMethod}
        Payment Method: ${payMethod}

        You have purchased the following:
        ${JSON.stringify(items, null, 2)}
      `

      const itemHeaders = "<tr>" + Object.keys(items[0])
        .map((header) => {
          return `<th>${header.toUpperCase()}</th>`
        }).join("") + "</tr>"
      const itemsHtml = "<table>"  + itemHeaders + items.map((item) => {
          return `
            <tr class="item">
              <td>${item.sku}</td>
              <td>${item.name}</td>
              <td>${item.category}</td>
              <td>${item.description}</td>
              <td><img src="${item.img}"></td>
              <td>${item.size}</td>
              <td>${item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.discount}</td>
            </tr>
          `
        }).join("") + "</table>"
      const mailHtml = `
        <div
          class="container">
          <div class="layout">
            <div class="flex">
              <div class="item__summary">
                <p>Thank you ${firstName} ${lastName}.</p>
                <p>Reference ID: ${orderId}</p>
                <p>Purchase Date: ${orderAt}</p>
                <p>Shipping Address: ${shipTo}</p>
                <p>Shipping Method: ${shipMethod}</p>
                <p>Payment Method: ${payMethod}</p>
              </div>
              <div class="item__details">
                ${itemsHtml}
              </div>
            </div>
          </div>
        </div>
      ` // mailText

      const mailOptions = {
        from: "info@clubseville.icu",
        // PROD
        to: recipient,
        // TEST
        // to: "sevillaarvin@gmail.com",
        subject: "Thank you for your purchase",
        text: mailText,
        html: mailHtml,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err)
          return
        }

        // TEST
        const link = nodemailer.getTestMessageUrl(info)
        resolve(link)
        // PROD
        // resolve()
      })
    })
  })
}

module.exports = {
  sendMail,
}
