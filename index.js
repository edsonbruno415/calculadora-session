const path = require('path');
const port = process.env.PORT || 3000;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    let contas = [];
    if('contas' in req.cookies){
        contas = req.cookies.contas;
    }
    res.render('index',{ contas });
});

Math.toRound = function(number, precision){
    let factor = this.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = this.round(tempNumber);
    return roundedTempNumber / factor;
}

app.post('/calc', (req, res) => {
    let { num1, op, num2 } = req.body;
    num1 = Number.parseFloat(num1);
    num2 = Number.parseFloat(num2);

    const calcular = {
        '+' : (num1, num2) => num1 + num2,
        '-' : (num1, num2) => num1 - num2,
        '*' : (num1, num2) => num1 * num2,
        '/' : (num1, num2) => num1 / num2
    }
    
    const total = calcular[op](num1,num2);
    let contas = [];

    if('contas' in req.cookies){
        contas = req.cookies.contas;
    }

    contas.push({
        num1, 
        op, 
        num2, 
        total: Math.toRound(total, 2)
    });

    res.cookie('contas', contas);
    res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Server running on http://localhost:' + port);
    }
});