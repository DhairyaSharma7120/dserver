const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN ;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

var otp = Math.floor(Math.random() * (9999 - 1000) + 1000);

console.log(otp)
client.messages
  .create({
    to: '+918320085121',
    from: '+17135978690',
    body: `HELLO THIS IS WORKING otp is ${otp}`,
  })
  .then(message => console.log('succesfully sent')).catch(err=>console.log(err));  