var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var server = require('../web/basic-server.js');
var initialize = require('../web/initialize.js');
var header = require('../web/http-helpers.js');
var http = require('http');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'/* && some condition looking to the server  archive.isUrlInList() === false maybe put loading.html?*/) {
    //nested if else for looking in archive vs looking at html
    //console.log(req)

  // if req.url pathname is /, do this
    // var testResult = req.url.indexOf('.') === -1;
    if (req.url.indexOf('.') === -1 && req.url !== '/') {
      res.writeHead(404);
      res.end();
    }
    if (req.url === '/') {
      fs.readFile('./web/public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    } else if (req.url.length > 1) {
      fs.readFile('./web/archives/sites' + req.url.toString(), function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(req.url);
        res.end();
      });
    } 
        

  } else if (req.method === 'POST' /*conditon for sending to the server*/) {
    //save URL from input, stringify
    //insert into stringified URL
    req.on('data', function(chunk) {
      fs.appendFile('./archives/sites.txt', chunk.toString().slice(4) + '\n', function (err) {
        
        if (err) {
          throw err;
        } else {
          res.writeHead(302, {'Content-Type': 'text/html'});
          console.log('Saved!');
          // if site exists in sites, link to it
          // else, link to loading.html
          fs.readFile(path.join(__dirname, './public/loading.html'), function(err, data) {
            //console.log('data:', data, 'err: ', err)
            res.write(data);
            res.end();
          });
          // res.end('Our robots are currently archiving the site you requested. Please check back soon for a freshly embalmed copy!');
        }
      });
    });
  }
};