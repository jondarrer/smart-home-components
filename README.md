# Smart Home Components

A collection of components for smart home Web Things (https://iot.mozilla.org)

## Installation

### Pre-requisites

* [pigpio C library](https://github.com/joan2937/pigpio)

**[Download and install latest version](http://abyz.me.uk/rpi/pigpio/download.html)**

```sh
wget https://github.com/joan2937/pigpio/archive/master.zip
unzip master.zip
cd pigpio-master
make
sudo make install
```

If the Python part of the install fails it may be because you need the setup tools.

```sh
sudo apt install python-setuptools python3-setuptools
```

## Testing

```sh
yarn test
```

## Building

```sh
yarn build
```
