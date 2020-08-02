/*
 * client.js
 *
 */


let socketClient = io();

function arrayBufferToImageBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:image/*;base64,' + window.btoa(binary);
}

socketClient.on('<list', (images) => {
   let ul =  document.getElementsByTagName('ul')[0]
   while(ul.firstChild){
       ul.removeChild(ul.firstChild);
   }
   for(let i = 0;i<images.length;i++){
       let li = document.createElement('li');
       li.innerHTML = images[i];
       ul.appendChild(li);
       li.addEventListener("click", (event)=>{
           socketClient.emit(">request", event.target)
       }); 
   }
});