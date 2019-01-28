var fs = require('fs');

var formidable = require('formidable');
var fileName = '';

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, files.upload.name);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
        fileName = files.upload.name; 
    });
}
exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile(fileName, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}
