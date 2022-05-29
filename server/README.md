# Requirements
node.js 16.15.0
npm 8.5.5

packages
* express
* crypto-js
* async-mutex
* node-fetch(not neccesary for api_server, but for the test file client.mjs)

install packages by 
```shell
npm install crypto-js
npm install express
npm install async-mutex
```
## Deploy 
1. setup users' information in userInfo.json
2. run api_server.js
```shell=
node api_server.js
```

## test
1. run api_server
``` shell=
node api_server.js
```
2. run client
```shell=
node client.mjs
```
