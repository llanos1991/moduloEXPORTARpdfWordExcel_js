
const htmlDocx= require('html-docx-js');
const saveAs= require('file-saver');
var fs = require('fs');

let htmlDocument = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" ><title>laura</title>';

let content='<h1>HOLA MUNDO CRUEL</h1> <p>archivo generado desde html</p>';


htmlDocument= htmlDocument +'</head><body>'+content+'</body></html>';

console.log(htmlDocument);
fs.writeFile("html-word.docx", htmlDocument, function(err) {
    if (err) throw err;
  });

  