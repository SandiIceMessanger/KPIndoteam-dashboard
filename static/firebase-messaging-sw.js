
importScripts(
  'https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyBq23zNf7Yxe419qwLeAmJ3Zrq--yIM4Z0","authDomain":"news-1b32b.firebaseapp.com","projectId":"news-1b32b","storageBucket":"news-1b32b.appspot.com","messagingSenderId":"406849213486","appId":"1:406849213486:web:4756c21e5d8abe99dc3bbf","measurementId":"G-C4Y097BSZH"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

self.addEventListener('push', function (e) {
  data = e.data.json();
    var options = {
      body: data.notification.body,
      icon: data.notification.icon,
      vibrate: [100, 50, 100],
      data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
  }
});
