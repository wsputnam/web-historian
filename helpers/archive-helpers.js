var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //look through list in site.text
  //perform callback on all elements (maybe)

  // input: callback with urls as inputs (string format?)

  // output: an array of urls?
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    //console.log('readlistdata:', data.toString());

    var dataArr = data.toString().split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if (dataArr[i] === '') {
        dataArr.splice(i, 1);
      }
    }
    callback(dataArr);
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // //console.log('req', res);
    // res.write(data);
    // res.end();
  });
};

exports.isUrlInList = function(url, callback) { 
  //look through list of for given url 
  //return true if url exists
  //else false
  //fs.open('./web/archives/sites.txt', function(err, data) {
    //console.log('req', res);

//---------------------------------------------------
  // var body = fs.readFileSync('./web/archives/sites.txt').toString();
  // var arr = body.split('\n');
  // if (arr.includes(url)) {
  //   callback(false);
  // } else {
  //   callback(true);
  //   console.log('error');
  // }
//---------------------------------------------------
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    var arr = contents.split('\n');
    if (_.indexOf(arr, url) === -1) {
      callback(false);
      console.log('error');
    } else {
      callback(true);
    }

  });
};

exports.addUrlToList = function(url, callback) {
  //given a url from index.html inupt
  //add url to list of sites that worker function to retrieve
  //console.log(url, callback)
  fs.appendFile(exports.paths.list, url + '\n', function(error, file) {
    callback(file);
  });
};

exports.isUrlArchived = function(url, callback) {
  //look to see if the site is archieved
  // var file = url.toString();
  fs.exists(path.join(exports.paths.archivedSites, url), function(exists) {
    if (exists) {
      callback(true);
    } else {
      callback(false);
    }
  });

};
const URL = require('url');
exports.downloadUrls = function(urls) {
  //fetch url from that url
    //save url with updated links and sources
    //just image sources to update? these don't really have to work
    //update links to other parts of the domain?
  _.each(urls, function(url) {
    var file = fs.createWriteStream(path.join(exports.paths.archivedSites, url));


    console.log('INSIDE EACH LOOP, url is', url);
    if(url !== ".DS_Store"){
      http.get('http://' + url, function(response) {
        response.setEncoding('utf8');
        //console.log('RESPONSE: ',response);
        // console.log('response', response);
        // console.log('Inside');
        //response.writeHead(302, {'Content-Type': 'text/html'});
        // console.log('url', url);
        // var body = '';
        // response.on('data', function(chunk) {
        //   body += chunk;
        // });
        response.on('end', function() {
          response.pipe(file);
          console.log('file', file);
        });
      });     
    }
  });
};
