const socket = io('http://localhost:9001');

const form = document.getElementById('input-container');
const messageInput = document.getElementById('input-message');
const messageContainer = document.querySelector('.chat-section');
const audio1=new Audio("small_beep_sms.mp3");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    // messageElement.setAttribute(
    //     'style',
    //     'padding: 10px; margin-bottom: 15px; background-color: var(--light-color); border-radius: 5px;'
    //   );
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='sender'){audio1.play();}
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'sender');
    socket.emit('send', message);
    messageInput.value = "";
})

// form.addEventListener('Choose')

const user_name = prompt("Enter the name of the person you want to talk to:");
socket.emit('new-user-joined', user_name);

socket.on('user-joined', name => {
    append(`${user_name} joined the chat`, 'receiver');
});
socket.on('receive', data => {
    append(`${user_name}: ${data.message}`, 'receiver');
});
socket.on('bye', data => {
    append(`${user_name} has left the chat`, 'receiver');
});