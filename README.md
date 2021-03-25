This is a starting template to control [Fadecandy](https://github.com/scanlime/fadecandy) on a [Raspberry Pi 4B](https://www.raspberrypi.org/).

There are some predependencies to make the node-canvas work on the Raspberry Pi 4B.

Per the node-canvas [wiki](https://github.com/Automattic/node-canvas/wiki/Installation%3A-Ubuntu-and-other-Debian-based-systems), they are as below.

```
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# then we can install the canvas module

npm install canvas
```

### License

MIT

### Credits

Big Shoutout to [dipamsen](https://github.com/dipamsen) for the gist to make node p5 work
You can see his explanation [here](https://github.com/CodingTrain/node-p5-test/issues/1)
