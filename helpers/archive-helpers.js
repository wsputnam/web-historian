var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  fs.readFile('./web/archives/sites.txt', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    //console.log('req', res);
    res.write(data);
    res.end();
  });
};

exports.isUrlInList = function(url, callback) {
  //look through list of for given url 
  //return true if url exists
  //else false
  fs.open('./web/archives/sites.txt', function(err, data) {
    //console.log('req', res);
    fs.exists(url, function() {
      if (exists) {
        callback(true);
      } else {
        callback(false);
      }
    });
  });
};

exports.addUrlToList = function(url, callback) {
  //given a url from index.html inupt
  //add url to list of sites that worker function to retrieve
};

exports.isUrlArchived = function(url, callback) {
  //look to see if the site is archieved
};

exports.downloadUrls = function(urls) {
  //fetch url from that url
    //save url with updated links and sources
    //just image sources to update?
    //update links to other parts of the domain?
};
