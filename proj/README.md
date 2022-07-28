<h2>Розробка проекту</h2>
<p>Застосовувалися такі основні команди:</p>

```powershell
//NEEDED NODE MODULES FOR THE PROJECT
npm install axios
npm install nodemailer --save

//FOR DOCKERFILE
docker build . -t bitservice
docker run -p 8081:8081 bitservice
```

<h2>Виконання проекту</h2>
<p>Після запуску проект оголошує константу та глобальну змінну, оголошення трьох функцій, подальший запуск першої - getBTC(), що надсилає запит на заданий url та отримує значення вартості валюти. Її фрагмент порівнює значення попереднє і отримане. У випадку зміни вартості повідомляє записаних у "базу даних" та користувача про зміни. Листа можна перевірити за URL, що додасться після успішного надсилання. Незалежно від виконання попередніх функцій працює функція внесення електронної адреси із клавіатури та додається з нового рядка.</p>

<p>Код програми</p> `script.js`

```js
const fs = require("fs")    //Запит на модуль fs, що використовуватиметься у різних 
let BTCrate = 0;            //Створення числової змінної, що в подальшому змінюватиметься у функції getBTC()

function getBTC() {         //Оголошення функції без операції її виклику
  const axios = require('axios');
  axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH')
    .then(response => {
      console.log(response.data.symbol);
      console.log(response.data.price);
      
                            //Виконання запиту на заданий ресурс, з метою отримати значення вартості валюти, за допомогою встановленого модуля axios
                          
      if (BTCrate != response.data.price && BTCrate != 0) {
        inform('Somebody', 'BTC rate', `Зараз валюта Біткоїн коштує ${BTCrate} гривень. Її вартість змінилася на ${((response.data.price / BTCrate) * 100 - 100).toFixed(3)}`); 
        console.log(((response.data.price / BTCrate) * 100 - 100).toFixed(3) + "% y порівнянні з попереднім значенням");
      };
      
                            //Створення умови, що полягає у перевірці попереднього значення змінної та в разі ствердного результату (значення змінної не дорівнюватиме отриманому значенню із ресурсу І не дорівнює початковому при запуску значенню) викликає функцію inform(), передаючи їй певні аргументи, а також повідомляє в консоль користувачу ситуацію із валютою
      
    BTCrate = response.data.price;
    
                            //Присвоєння змінній отриманого значення
    
  });

  setTimeout(getBTC, 60000);
                            
                            //Повторний виклик функції через хвилину після завершення її виконання
                            
}

function add_email(email) {                            //Створення функції додавання електронної пошти у файл

  const readline = require('node:readline');           //Запит на використання стандартного модуля node.js
  const rl = readline.createInterface({
    input: process.stdin,
  });
                                                       //Читання введеного користувачем тексту в консолі
  let flag = -1;
  const nel = process.platform === '\n'; 
                                                       //створення змінної - показника, що впливатиме на запис файлу та створення константи - сепаратора для перенесення наступного внесеного електронного адресу на новий рядок

  rl.question("Введіть e-mail:", function(email){
    if (email.indexOf('@') > -1) {
      var everyline = require('readline').createInterface({
        input: fs.createReadStream('db.txt')
      });
                                                       //Якщо знайдено символ "@" у внесеному адресі, вважатиметься, що це - справжній адрес. Таким чином, кожен рядок із файлу, який був записаний у файл, перевірятиметься на збіжність із внесеним 
      
      everyline.on('line', function (line) {
        if (line == email + ' ') {
          console.log(line, ' уже слідкує за курсом');
          ++flag
        }
      });
    }
                                                        //Якщо відбувся збіг під час перевірки, програма повідомляє про це користувача та інкрементує значення змінної - показника flag

    function adding(){
      if (flag == -1) {
        console.log('email внесено');
        fs.appendFile('db.txt', `${email} \n`, function(err, result) {
          if(err) console.log('error', err);
        });
      }
      else{
        console.log('email повернено');
      }
    }
                                                        //Безпосередньо внесення до "бази даних" електронної пошти або його повернення, якщо такий екземпляр зустрічався у базі
    setTimeout(adding, 500);
    setTimeout(add_email, 3000);
  });
}

async function inform(name, subject, message) {                   //Оголошення асинхронної функції, із параметрами

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
                                                                  //Із застосуванням встановленго модуля nodemailer програма отримує тимчасовий (тестовий) логін і пароль та авторизовується. У подальшому, читаючи текстовий файл, надсилає кожному введеному користувачем e-mail-у та сповіщує про можливість його перегляду.
                                                                    
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
                                                                //Виклик двох функцій, що отримують дані та надають можливість внести електронну пошту користувачу відповідно
```
