var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BLp_5YbYSMq3PgWpySrDaS72AKDopFYuR-7uN-MgM3Qv3_O5stJD-e0lmiVhJMhzipHDI6iUk01yQz0mn24pxbw",
   "privateKey": "JVF1NCpGO-koEDISNsArVHIMld8GL2pf5N47Hm6307g"
};


webPush.setVapidDetails(
   'mailto:mexdesain@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fgernqM_4lY:APA91bEjhgOrh4VTk_z0WkJm3l1BI2UTG0RE8vOcNFW6Q1vX8VS1mUMTstmcghtwqAjpwict2zXePnWN7Z7l0Nh14wo_unJ81yzHIzmOPwtKeVplMQHxxHM8BLlDNUCDeJKWvVwKKMS5",
   "keys": {
       "p256dh": "BA+fJL1yAwZaObjMIwztkZmwdxggiRqBKLJN7UhH/NdVh8rfv6ANX/faztIFCjaikhC7htPTSJfllSVk+/+pITE=",
       "auth": "CHY5FcA8+L3Df0hdb2xwVw=="
   }
};
var payload = 'Horeee...Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '688500454839',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
