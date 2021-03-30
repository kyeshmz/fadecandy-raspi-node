This is a starting template to control [Fadecandy](https://github.com/scanlime/fadecandy) on a [Raspberry Pi 4B](https://www.raspberrypi.org/).

There are some predependencies to make the node-canvas work on the Raspberry Pi 4B.

Per the node-canvas [wiki](https://github.com/Automattic/node-canvas/wiki/Installation%3A-Ubuntu-and-other-Debian-based-systems), they are as below.

```
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# then we can install the canvas module

npm install canvas
```

Because this is intended to work as a headless alternative to p5, it needs to be run with CommonJS in mind and also the setupWindow function must be run before importing p5 or else errors will occur about no window context.

### Pm2

This uses pm2 slack integration
change the SLACKURL in the pm2:install config inside of package.json

### License

MIT

### Credits

Big Shoutout to [dipamsen](https://github.com/dipamsen) for the gist to make node p5 work
You can see his explanation [here](https://github.com/CodingTrain/node-p5-test/issues/1)
