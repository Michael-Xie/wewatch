# WeWatch

## About


During COVID-19, people are stuck in their homes. Times of watching shows together with your friends feel like a distant past.

WeWatch is a virtual couch for friends to watch videos together and share laughters and moments.


## Features

### Works
- play and pause synchronously across client for video
- synchronize video scrum change
- synchronize video link change
- participants can stream themselves via video/audio

### WIP
- allow participants to join room
- create room for participants to watch video together

- [stretch] participants can toggle video/audio stream 

## How to use it

1. Create room (WIP)
2. Share room link to friend 
3. Enter video link to watch
4. Friends join room and watch

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

This application should give you a ready-made starting point for writing your
own appointment reminder application. Before we begin, we need to collect
all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Phone&nbsp;number | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into `wewatch`

2. Install dependencies for both the `client` and `server`

```bash
npm install
```

3. Set your environment variables in `server`

```bash
cp .env.example .env
```

See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables.

4. Run the application for both `client` and `server`

```bash
npm start
```

5. Navigate to [http://localhost:3000](http://localhost:3000)

That's it!


## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

