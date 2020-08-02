/*
 * pixserver.js
 *
 */

let express = require('express')();
let http = require('http').createServer(express);
let socketServer = require('socket.io')(http);

express.get('/', (request, response) => {
    fs.readFile('./index.html')
      .then((content) => {
        // Writes response header
        response.writeHead(200, { 'Content-Type': 'text/html' });
        // Writes response content
        response.end(content);
      })
      .catch((error) => {
        // Returns 404 error: page not found
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found.');
      });
  });

  express.get('/client.js', (request, response) => {
    fs.readFile('./client.js')
      .then((content) => {
        // Writes response header
        response.writeHead(200, { 'Content-Type': 'application/javascript' });
        // Writes response content
        response.end(content);
      })
      .catch((error) => {
        // Returns 404 error: page not found
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found.');
      });
  });
  
  
  // Server listens on port 8080
  http.listen(8080);

// File system module using promises
let fs = require('fs').promises;

// Directory to be shared
let startingDirectory = __dirname;
if (process.argv[1] != undefined)
{
    startingDirectory = process.argv[1];
}
// List containing the picture names
let pictureList = [];

function scanDir(path)
{
    //a refaire
    fs.readdir(path, {withFileTypes : true})
        .then((dir)=>{
            for(var i=0;i<dir.length;i++)
            {
                pictureList.push(path, dir[i])
            }
        });
}
socketServer.on('connection', function (socket) 
{
    
    socket.emit('<list', scanDir(startingDirectory))
    console.log(pictureList);

    socket.on('>request', (image)=>{
        if(isValid(image))
        {
            fs.readdir(image)
            .then()
        }
    });
});

function isValid(filename)
{
    let rtrn = false;
    let i = 0;
    while(rtrn == false || i<pictureList.length){
        if (pictureList[i] == filename)
            rtrn = true;
        i++;
    }
    return rtrn;
}