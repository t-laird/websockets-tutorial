const socket = io();
let userId = `User${Math.floor(Date.now()/10000)}`;

socket.on('connect', () => {
  console.log('🚀 You have connected 🚀');
});

socket.on('message', message => {
  const currentTime = new Date();
  console.log('message');
  $('.messages').append(`<h3>[${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}]🚀 ${message}</h3>`);
  const elem = document.querySelector('.messages');
  elem.scrollTop = elem.scrollHeight;
});

socket.on('welcome', message => {
  $('.messages').append(`<h2>${message}</h2>`);
});

const sendMessage = () => {
  const msg = $('.message').val();
  if (!msg.length) {
    return;
  }

  const nameRegex = new RegExp(/\[\S+\]/)
  if (nameRegex.test(msg)) {
    userId = msg.match(nameRegex)[0];
  }
  socket.send({
    username: userId,
    text: msg
  });
  $('.message').val('');
  $('.message').focus();
}

const inputHelper = (e) => {
  if ($('.message').val().length) {
    $('.send').removeAttr('disabled');
  } else {
    $('.send').attr('disabled', '');
  }

  if (e.keyCode === 13) {
    sendMessage();
  }
}

$('.send').on('click', sendMessage);
$('.message').on('keyup', inputHelper);