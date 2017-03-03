# dronejs
Handle windows entities by Node.js. Automate mouse, keyboard, screen etc.

### Before start (Build from sources)
Run this in PowerShell with Administrator:
 - `npm install --global --production windows-build-tools`
 Make sure Python and Visual C++ Build Tools installed successfully
 - `npm i -g node-gyp`
 - set PATH `PYTHON=C:\Users\%USERPROFILE%\.windows-build-tools\python27\python.exe` or smth like this
 - `npm i`
Can help: http://stackoverflow.com/questions/32556295/npm-install-error-the-build-tools-for-v120-platform-toolset-v120-cannot

### OS X
 - `sudo npm i -g node-gyp`
 - `node-gyp install`
 - check XCode: `xcode-select -p`. Can help: http://railsapps.github.io/xcode-command-line-tools.html
 - `cd node_modules/robot-js`
 - `make`
 
