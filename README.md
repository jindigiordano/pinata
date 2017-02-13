# Pinata
A red-envelope style app for Flock. 

# About
Ever wanted to get your team's attention on Flock, but your message keeps getting buried under gifs of dogs?
Use Pinata, the app that get's your Flock chat's attention immediately by seding them a pinata filled with money!

# How it works
Manager send pinata filled with designated amount of money, ie. $10. First person to click on it get's the largest percentage of that money, then the second and third receive less, respectively, and so on. Incentivizes employees to check their company Flock chat, and helps them create fond memories of the company chat. 

It's simple, just use the '/pinata' slash command to play!

## Contributors
* [Katrina DeVaney](https://github.com/kattak)
* [Jin Di Giordano](https://github.com/jindigiordano)
* [James Draper](https://github.com/jdraper9)
* [Andy Bruckman](https://github.com/abruckman)
* [May Wu](https://github.com/codemayday)

## Clone This Repository
1. To recreate this app, fork and clone this repo
    git clone <your repo url>

## Install ngrok to host app on localhost and get URL for Flock App
1. Install ngrok
2. In the directory where you downloaded ngrok, run
    ./ngrok http 8080

## Create App in Flock
1. Create your new Flock App [here](https://dev.flock.co/apps/new)
2. Give your app a name and description, click save.
3. Click to expand Advanced Info section
4. Event listener URL should be your ngrok https url, + '/events' (ie. 'https://<your-ngrok-numbers>.ngrok.io/events')
5. Make sure it's https!
6. Turn Slash Command on, give it a slash command (just the word, no slash before it here) and description
7. Select slash command action "Send to event listener URL"
8. Enable bot
9. Click save for this section (important!)
10. Copy the App Id, App Secret, Bot Id, and Bot Secret for you config.js file (how to format this config.js below)
11. Click Save for Publish your app on Flock App store (you can leave it private, or select team-only install if you want team members to be able to download it too).

## Add App Info to config.js
After you've created your new Flock App [here](https://dev.flock.co/apps/new), you will find the following ID's and tokens for your config.js file.

Since config.js is in the gitignore, you'll have to first create the file, then add the following:

```javascript
    module.exports = {
    appId: <your app id>,
    appSecret: <your app secret>,
    botUserId: <your bot id>,
    botToken: <your bot token>
    };
```

## Replace ngrok URL in index.js
Replace any ngrok urls in the index file with your currently running one. ngrok urls refresh every time ngrok is started. 

## Start Local Server
1. In your project directory, run
    node index.js

## Install Your New App
1. Once you have your config.js file setup, click install on the top of the page where you setup your app! (If you've navigated away, it's under the Flock Apps >> Your Apps section when you go to Build Apps)
2. You should see the install event appear on your server!

## Using the slash command
1. Type /pinata in your chat
2. 🎉 🎉 **Magic happens** 🎉 🎉

----
## Thanks
* [Flock Alarms Tutorial](https://github.com/flockchat/flock-alarms)
