const socket = io();

let username = '';

document.getElementById('join-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    username = document.getElementById('username-input').value.trim();
    if(username!==""){
        document.querySelector('.form-username').style.display = 'none';
        document.querySelector('.main-container').style.display = 'flex'
        document.querySelector('.form-container').style.display = 'none';
    }
    console.log(username);
}) 

document.getElementById('send-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    const data = {
        username : username,
        message : document.getElementById('message-input').value,
    }
    //if io is emmiting anything 'sockets' can listen but if 'socket' is emmiting anything only io can listen 
    //sending message to io
    socket.emit('message',data);
    //what ever message i am sending i need to show that to UI
    console.log(data);
    addMessage(data);
})

//receiving the message
socket.on('message',(data)=>{
    //before adding this message just check if you are the sender
    if(data.username!==username){
        addMessageRe(data);
    }
    
})

//working for sent messages
function addMessage(data){
    console.log('test');
    var msgDiv = document.createElement('div');
    msgDiv.innerText=`${data.username}: ${data.message}`;
    msgDiv.setAttribute('class','message sent');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value = '';
} 


//working for received mesages

function addMessageRe(data){
    var msgDiv = document.createElement('div');
    msgDiv.innerText=`${data.username}: ${data.message}`;
    msgDiv.setAttribute('class','message received');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value = '';
}