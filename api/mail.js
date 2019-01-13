const nodemailer = require("nodemailer")
const development = process.env.NODE_ENV === "production" || true

const sendMail = (recipient, orderDetails) => {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      const config = development ? {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        }
      } : {
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@clubseville.icu",
          pass: "P@ssw0rd",
        },
      }
      const transporter = nodemailer.createTransport(
        config
        // {
        //   // TEST
        //   // host: "smtp.ethereal.email",
        //   // port: 587,
        //   // secure: false,
        //   // auth: {
        //   //   user: account.user,
        //   //   pass: account.pass,
        //   // },
        //   // PROD
        //   // host: "smtp.zoho.com",
        //   // port: 465,
        //   // secure: true,
        //   // auth: {
        //   //   user: "info@clubseville.icu",
        //   //   pass: "P@ssw0rd",
        //   // },
        // }
      )

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
        const price = item.price ? parseFloat(item.price).toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP"
        }) : "-"
        const discount = item.discount ? parseFloat(item.discount).toLocaleString("en-PH", {
          style: "currency",
          currency: "PHP"
        }) : "-"
        return `
          <tr class="item">
            <td>${item.sku}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.description}</td>
            <td><img src="${item.img}" width="100" height="100"></td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>
              ${price}
            </td>
            <td>
              ${discount}
            </td>
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

      const mailOptions = development ? {
        from: "info@clubseville.icu",
        to: "sevillaarvin@gmail.com",
        subject: "Thank you for your purchase",
        text: mailText,
        html: mailHtml,
      } : {
        from: "info@clubseville.icu",
        to: recipient,
        subject: "Thank you for your purchase",
        text: mailText,
        html: mailHtml,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err)
          return
        }

        if (development) {
          const link = nodemailer.getTestMessageUrl(info)
          resolve(link)
        } else {
          resolve()
        }
      })
    })
  })
}

module.exports = {
  sendMail,
}
