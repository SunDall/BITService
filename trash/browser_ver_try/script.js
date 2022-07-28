let exch = 0;
$(document).ready(function(){
    getBTC();
});

function getBTC() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH');
    ajax.onload = function() {
        var data = this.responseText;
        //alert(data);
        if (exch != data.slice(28, 38) && exch != 0) {
            inform(); 
            document.getElementById('proc').innerHTML = (100 - (data.slice(28, 38) / exch) * 100).toFixed(3) + "%";
        };
        exch = data.slice(28, 38);
        document.getElementById('value').innerHTML = exch;
    };
    ajax.send(null);
    console.log(exch);
    setTimeout(getBTC, 60000);
}

function add_email() {

    let email = document.getElementById('email').value;
    if (email.indexOf('@') > -1) {
        console.log(email);
        //import * from '/fs';
        let fs = require('fs')
        //console.log(fs.readFileSync("db.txt", 'utf-8'));
        //fs.appendFile('db.txt', email);
    }
}

function inform() {
/*
const mandrill = require('node-mandrill')('<your API Key>'); 

function sendEmail ( _name = 'somebody', _email = 'ejvhgymlokmdphzhdb@nthrl.com', _subject, _message) {
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

/*
function sendMail() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'YOUR API KEY HERE',
        'message': {
          'from_email': 'YOUR@EMAIL.HERE',
          'to': [
              {
                'email': 'RECIPIENT@EMAIL.HERE',
                'name': 'RECIPIENT NAME (OPTIONAL)',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'YOUR SUBJECT HERE!',
          'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}
*/




}
