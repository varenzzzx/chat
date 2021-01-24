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
