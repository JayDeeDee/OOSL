# Framework for Frontend Development (MacOS)

Framework for developing frontend projects in IntelliJ Idea IDE:

1. create dynamic html templates with the help of Django templates
2. semi automatic pre-processing of less and concating of JavaScript
2. semi automatic export of static markup
3. semi automatic export of screenshots via command line
4. bundle exports in a convenient format.

## Requirements

* OS X 10.9 Mavericks or OS X 10.10 Yosemite
* IntelliJ Idea IDE
* Python 2.7
* Pip
* Node.js
* npm

## Installation in IntelliJ Idea

Please follow the following steps to install the html framework on your computer in the IntelliJ Idea IDE:

### Fetch Sources

Fetch the sources from directory /esa_3/frontend_fw/  of the OOSL Repository

### Creating virtual environment with Django and Fabric

open terminal and go to directory frontend_fw
> virtualenv env

> source env/bin/activate

> pip install django

> pip install fabric

copy the envwebkit2png.py from directory 'esa3/webkit2png/' into the virtual environment under 'env/bin/'

webkit2png is a command line tool written by Paul Hammond that creates screenshots of webpages


### Configure project in IntelliJ Idea IDE

Start IntelliJ Idea and ensure under File -> Settings -> IDE Settings that you have the following plugins installed:

1. Python
2. Persistance Framework Support Plugin (for Django)
3. LESS support

Create an IntelliJ Idea Project with 'File' -> 'New Project':


1. Set the project location to where you downloaded the sources and select module 'Django' on the left
2. Select the local python interpreter in the env directory
3. Edit the run configurations by clicking on the 'frontend_fw' next to the green arrow and select 'Edit Configurations'
4. In the dialog set host to localhost, port to 8001 and check 'Run browser'

### Install Grunt and Grunt plugins

open terminal and go to directory 'frontend_fw/frontend_fw/static'

Grunt and Grunt plugins are defined as devDependencies in the package.json file, if you wish you can install all of the dependencies for the frontend project with a single command: 
> npm install

go to 'frontend_fw/frontend_fw/templates/static' and repeat the installation for the framework templates



