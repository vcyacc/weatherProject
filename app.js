const express = require('express');
const https =  require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
    const query = req.body.city;
    const key = "7645e652eb067e21186a8c8bc1f35399";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + key;
    console.log(url);
    https.get(url, function(response) {
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
            res.write('<p>The Weather is currently ' + weatherDesc +'</p>');
            res.write('<h1>The temperature in ' + city + ' is ' + temp +' degree Celcius</h1>');
            res.write("<img src=" + imageURL + " alt='Image'>");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log('Server is running on 3000');
});