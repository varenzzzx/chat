// /public/javascript.js

// Get the current username from the cookies
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('Tulis Nama :');
  if (!user) {
    alert('Error !');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}
// Connect to the server-side websockets. But there's no server yet!
var socket = io();
// The user count. Can change when someone joins/leaves
socket.on('count', function (data) {
  $('.user-count').html(data);
});

// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});
// When the form is submitted
$('form').submit(function (e) {
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});// ./public/javascript.js

// Get the current username from the cookies
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

var socket = io();

// The user count. Can change when someone joins/leaves
socket.on('count', function (data) {
  $('.user-count').html(data);
});

// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

// When the form is submitted
$('form').submit(function (e) {
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});
// ./public/javascript.js

// Get the current username from the cookies
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
  }
}

var socket = io();

// The user count. Can change when someone joins/leaves
socket.on('count', function (data) {
  $('.user-count').html(data);
});

// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

// When the form is submitted
$('form').submit(function (e) {
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});
// /index.js

const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

server([
  get('/', ctx => render('index.html'))
]);
// /index.js

const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

server([
  get('/', ctx => render('index.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage)
]);
