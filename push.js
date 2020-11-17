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
   "endpoint": "https://fcm.googleapis.com/fcm/send/fVp-9fw7_b4:APA91bHVTIfkWNBCIMag_C1qEoclx30hzn_stiGemxPWAsH1stb4DaGVOSL0s44PBsGjUlpYuzKQgk76Bqjsi9bQz1OsUJm9QkMtyEHzyjEreF48nljXo-zBiAYspBegvdbaZWKb3HdX",
   "keys": {
       "p256dh": "BGozi8eTUL1kzc+oSD97PqCC72h4fq14posuvJ2CGancDUHqzGegnM+GazlCzsxEpNqBcu8gm29zTA35V6/+S00=",
       "auth": "SLiSW8uDrmb/xC/WstIaNw=="
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
