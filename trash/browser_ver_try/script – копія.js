//npm install axios
//nmp install nodemailer --save


//https://nodejs.org/ru/docs/guides/nodejs-docker-webapp/
//https://nodejsdev.ru/doc/email/


const fs = require("fs")
let BTCrate = 0;
//let exch = 0;

function getBTC() {
  const axios = require('axios');
  axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH')
    .then(response => {
      console.log(response.data.symbol);
      console.log(response.data.price);
      if (BTCrate != response.data.price && BTCrate != 0) {
        inform('Somebody', 'BTC rate', `Зараз валюта Біткоїн коштує ${BTCrate} гривень. Її вартість змінилася на ${((response.data.price / BTCrate) * 100 - 100).toFixed(3)}`); 
        console.log(((response.data.price / BTCrate) * 100 - 100).toFixed(3) + "% y порівнянні з попереднім значенням");
      };
    BTCrate = response.data.price;
  });

  setTimeout(getBTC, 60000);
}



function add_email(email) {

  const readline = require('node:readline');
  const rl = readline.createInterface({
    input: process.stdin,
    //output: process.stdout
  });
  let flag = -1;
  const nel = process.platform === '\n';
  rl.question("Введіть e-mail:", function(email){
    if (email.indexOf('@') > -1) {

      var everyline = require('readline').createInterface({
        input: fs.createReadStream('db.txt')
      });
      
      everyline.on('line', function (line) {
       // console.log(line);
        if (line == email + ' ') {
          console.log(line, ' уже слідкує за курсом');
          ++flag
        }
      });
    }
    function adding(){
      if (flag == -1) {
        console.log('лист надіслано');
        fs.appendFile('db.txt', `${email} \n`, function(err, result) {
          if(err) console.log('error', err);
        });
      }
      else{
        console.log('лист повернено');
      }
    }
    setTimeout(adding, 500);
    setTimeout(add_email, 3000);
  });

}



async function inform(name, subject, message) {
 
  const nodemailer = require('nodemailer')
  let testEmailAccount = await nodemailer.createTestAccount()
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testEmailAccount.user,
      pass: testEmailAccount.pass,
    },
  })


  var everyline = require('readline').createInterface({
    input: fs.createReadStream('db.txt')
  });
  
  everyline.on('line', async function (line) {
    console.log('Надсилаємо інформацію:', line);

    email = line.slice(0, -1);

    let result = await transporter.sendMail({
      from: '"Somebody" <nodejs@example.com>',
      to: email,
      subject: subject,
      text: message,
      html:
      `${message}%`,
    })
    console.log("Надіслане повідомлення можна переглянути за URL: %s", nodemailer.getTestMessageUrl(result));
    console.log(result)

  });






 //https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/ 
 /*
  const nodemailer = require('nodemailer');
 
 
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xyz@gmail.com',
        pass: '*************'
    }
});
 
let mailDetails = {
    from: 'xyz@gmail.com',
    to: 'abc@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});


*/


/*
const mandrill = require('node-mandrill')('<your API Key>'); 

function sendEmail ( _name, _email, _subject = 'BTC rate', _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'noreply@yourdomain.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
}
app.post( '/api/sendemail/', function(req, res){
            
    let _name = req.body.name;
    let _email = req.body.email;
    let _subject = req.body.subject;
    let _messsage = req.body.message;

    //implement your spam protection or checks. 

    sendEmail ( _name, _email, _subject, _message );

});

*/




}
getBTC();
add_email();
