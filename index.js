var UglifyJS = require('uglify-js');

var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'details-polyfill.js');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
    if (!err) {
      // console.log('received data: ' + data);
      // response.writeHead(200, {'Content-Type': 'text/html'});
      // response.write(data);
      // response.end();
      fs.writeFile('details-polyfill.min.js', UglifyJS.minify(data).code, function(err) {
          if(err) { return console.log(err); }
          console.log('details-polyfill.js was minified!');
      }); 
    } else {
        console.log(err);
    }
});