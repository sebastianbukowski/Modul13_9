var fs = require('fs');
var formidable = require('formidable');
var fileName = '';
var uploadDir = './upload/';
var fileUrl = '';

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    
    form.parse(request, function(error, fields, files) {
        console.log(fields);
        console.log(files.upload.name);
        console.log(files.upload.path);
        if(fields.title && fields.title.length !== 0) {
            fileName = fields.title;
        } else {
            fileName = files.upload.name;
        }
        console.log(fileName);
        fs.renameSync(files.upload.path, form.uploadDir + fileName );
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
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
    console.log(fileName);  
    fileUrl = uploadDir + fileName;
    console.log('fileUrl', fileUrl);
    fs.readFile(fileUrl, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}
