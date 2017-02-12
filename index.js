var config = require('./config.js');
var flock = require('flockos');
var express = require('express');
var store = require('./store.js');
var Mustache = require('mustache');
var fs = require('fs');
var util = require('util');
var PubNub = require('pubnub')


flock.appId = config.appId;
flock.appSecret = config.appSecret;

var app = express();
app.use(flock.events.tokenVerifier);
app.post('/events', flock.events.listener);
app.listen(8080, function () {
    console.log('Listening on 8080');
});

flock.events.on('app.install', function (event, callback) {
    store.saveToken(event.userId, event.token);
    callback();
});

flock.events.on('client.slashCommand', function (event) {
    // console.log(flock.groups.getInfo(config.botToken, {
    //   groupId: event.chat
    // }));
    console.log('**')
    console.log(flock.groups)
    console.log('**')
    flock.groups.getInfo(config.botToken, event.chat,  function (error, response) {
      console.log('***<<><>><><>><<><>><****');
      if (error) {
        console.log('error: ', error);
      } else {
        console.log(response);
      }
      console.log('***<<><>><><>><<><>><****');
    });

    //create pubnub channel
    var pubnub = new PubNub({
        publishKey: 'pub-c-dd67de64-9c14-4790-906e-d26042ada52f',
        subscribeKey: 'sub-c-103fb66a-f0de-11e6-acae-0619f8945a4f'
    });

    pubnub.addListener({
        message: function(message){
          // console.log(message)
        }
    })
    pubnub.subscribe({
        channels: ['demo_tutorial']
    });
    //

    flock.chat.sendMessage(config.botToken, {
      to: event.chat,
      text: "🎉🎉💸💸It's piñata time!💸💸🎉🎉",
      attachments: [{
        // "id": "blah",
        // "title": "Attachment",
        // "description": "An attachment",
        // "appId": event.appId,
        // // Precedence order of previews:
        // // widget > html > flockml > images
        // "color": "#0ABE51",
        "views": {
            // Attachment widget
            "widget": { "src": "https://59319b0e.ngrok.io/pub", "width": 400, "height": 400 },
            // // Inline html
            // "html": { "inline": "<img src='https://media.giphy.com/media/iqgkvYsr2VYBy/giphy.gif' width='200'>", "width": 400, "height": 200 },
            // "flockml": "<inline flockml>",
            // For image, only "src" is mandatory, everything else is optional
            // "image": {
            //     "original": { "src": "https://media.giphy.com/media/iqgkvYsr2VYBy/giphy.gif" }, //"width": 400, "height": 400 },
            //     "thumbnail": { "src": "https://media.giphy.com/media/iqgkvYsr2VYBy/giphy.gif"}, //"width": 100, "height": 100 },
            //     "filename": "pinata.gif"
            // }
        }
        // ,
        // "url": "<unfurled url>",
        // "forward": "true",  // default: false
        // For downloads, only "src" is mandatory, everything else is optional.
        // The client can use mime to show an appropriate file icon to the user.
        // Slashes and dots from the filename should be stripped.
        // "downloads": [
        //     { "src": "<download 1 url>", "mime": "<mime type>", "filename": "<filename 1>", "size": <bytes> },
        //     { "src": "<download 2 url>", "mime": "<mime type>", "filename": "<filename 2>", "size": <bytes> }
        // ],
        // "buttons": [ {
        //      "name": "Take a Swing!",
        //      "icon": "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-black-icons-sports-hobbies/044569-glossy-black-icon-sports-hobbies-sport-baseball-bat-sc43.png",
        //      "action": { "type": "openWidget", "desktopType": "modal", "mobileType": "modal", "url": "https://06c98041.ngrok.io/events" },
        //      "id": "1"
        // } ]
    }]
  }, function (error, response) {
    if (error)
        console.log('error: ', error);
    else
        console.log(response);
  })
});


var swingTemplate = fs.readFileSync('swing.mustache.html', 'utf8');
app.get('/swing', function (req, res) {
    var event = JSON.parse(req.query.flockEvent);
//     // var alarms = store.userAlarms(event.userId).map(function (alarm) {
//     //     return {
//     //         text: alarm.text,
//     //         timeString: new Date(alarm.time).toLocaleString()
//     //     }
//     // });
    res.set('Content-Type', 'text/html');
    var body = Mustache.render(swingTemplate);
    res.send(body);
});

var pubTemplate = fs.readFileSync('pub.mustache.html', 'utf8');
app.get('/pub', function (req, res) {
    var event = JSON.parse(req.query.flockEvent);
//     // var alarms = store.userAlarms(event.userId).map(function (alarm) {
//     //     return {
//     //         text: alarm.text,
//     //         timeString: new Date(alarm.time).toLocaleString()
//     //     }
//     // });
    res.set('Content-Type', 'text/html');
    var body = Mustache.render(pubTemplate);
    res.send(body);
});
