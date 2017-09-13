importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
    "messagingSenderId":"86676550585"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload){
    console.log('Receiver background message', payload);
    return self.registration.shownotification({}, {});
});