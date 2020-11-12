/**
 *
 * Run:
 *
 */

require('dotenv').config();

// console.log(process.env)

const mailjet = require('node-mailjet').connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

// const mailjet = require('node-mailjet').connect(
//     'f11503f90c5f17ff5832104fc98e7c0a',
//     'ddb029f4d659549b739bdef3b3bb0456'
//   );

const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.SENDER_EMAIL,
          Name: 'Me',
        },
        To: [
          {
            Email: process.env.RECIPIENT_EMAIL,
            Name: 'You',
          },
        ],
        Subject: 'My first Mailjet Email!',
        TextPart: 'Greetings from Mailjet!',
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  })
  request
    .then(result => {
      console.log(result.body, 'success')
    })
    .catch(err => {
      console.log(err.statusCode, 'error')
    })