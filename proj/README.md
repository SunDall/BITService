
[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2336BCF7&lines=Computer+science+student)](https://git.io/typing-svg)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
```cmd
//npm install axios
//npm install nodemailer --save

//FOR DOCKERFILE
//              1
//docker build . -t bitservice
//              2
//docker run -p 8081:8081 bitservice
```
```js

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
}

getBTC();
add_email();
```
