var http = require('http');
var colors = require('colors');
var handlers = require('./handlers'); // nasz moduł

function start() {
    function onRequest(request, response) {
        console.log("Odebrano zapytanie.".green);
        console.log("Zapytanie " + request.url + " odebrane.");
        switch (request.url) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
                break;
        }
    }

    http.createServer(onRequest).listen(9000);

  console.log("Uruchomiono serwer!".green);
}

exports.start = start;

