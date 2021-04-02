# cras

CLI to create a React Application built on UI5 React Web Components <br>
This creates a Fiori style React application with an MTA (Multi Target Application) deployment configuration<br>
The application runs with the managed approuter and is ready to be run on the Fiori LaunchPad<br><br>

## Prerequisites
- install CF cli 
    - https://docs.cloudfoundry.org/cf-cli/install-go-cli.html#pkg
- install CF html5 plugin
    -  https://github.com/SAP/cf-html5-apps-repo-cli-plugin
- install mbt cli 
    - https://sap.github.io/cloud-mta-build-tool/download/
<br><br>


## Create 
```
$ cras fiori 
```


## Build
```js
$ npm run build:mta
```


## Deploy
```js
$ npm run deploy:mta
```

dev:
test: node . fiori
test global: 
- npm install -g .
- cras fiori
