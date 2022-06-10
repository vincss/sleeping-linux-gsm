# Sleeping-Linux-Gsm
The aim of this project is to put your server at rest when no one is using it.

What it does :
* Host a web interface that will allow :
    * A player to see the current status of the server for his favorite game.
    * Wake up the server on demande if this one is still sleeping.
    * Shut down the server when no body needs it anymore.

![alt text](./res/sleeping-linux-gsm.png?raw=true "Sleeping-Linux-Gsm")


## How To use

### ! Important !
The user that will run this web-server needs to have the permission to launch the command in the settings file.

### Install
You can either :
 * Use it from binaries (easiest) :
    * Download [the latest release](https://github.com/vincss/sleeping-linux-gsm/releases)
    * Launch the executable.
 * From source (advanced) :
    * Get the latest node lts
    * Clone this repo or download the source 
    * Install the dependencies : 'npm ci'
    * Start the server : 'npm start'

Configuration :
    * At the first launch a settings.yml file will be created. [See settings.yml](./settings.yml) 

### Change Log
 * 0.0.4
    * Add asyncStart, for V-Rising under Wine support
 * 0.0.3
    * Compress binaries 
* 0.0.2
    * Fix binary version
 * 0.0.1
    * Initial version