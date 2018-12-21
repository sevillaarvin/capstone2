const nodemailer = require("nodemailer")

const sendMail = (recipient, orderDetails) => {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false,
        // auth: {
        //   user: account.user,
        //   pass: account.pass,
        // },
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@clubseville.icu",
          pass: "P@ssw0rd",
        },
      })

      const mailOptions = {
        from: "info@clubseville.icu",
        // to: recipient,
        to: "sevillaarvin@gmail.com",
        subject: "Thank you for your purchase",
        text: `You have purchased`,
        html: `You have purchased`,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err)
          return
        }

        // const link = nodemailer.getTestMessageUrl(info)
        // resolve(link)
        resolve()
      })
    })
  })
}

module.exports = {
  sendMail,
}
