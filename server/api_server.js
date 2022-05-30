var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cryptojs = require('crypto-js');
var Mutex = require('async-mutex').Mutex;

var app = express();

const CMD_FETCH = '/api/fetchInfo';
const CMD_KILL = '/api/killp';

var fetch = require('./fetch.js');
var kill = require('./kill.js')
const port = 8888;
const processInfo_path = './processInfo.json'
const userInfo_path = './userInfo.json'

const mutex = new Mutex();


function authenticate(user, signature, reqTime){
	let user_data = JSON.parse(fs.readFileSync(userInfo_path));
	let user_secret = user_data.filter(entry => entry.user == user)[0].user_secret;
	let string = user + reqTime + user_secret;
	let hash = cryptojs.SHA256(string).toString(cryptojs.enc.Hex);
	return hash == signature.toString(cryptojs.enc.Hex);
}

// for fetchInfo command
app.get(CMD_FETCH, async function(req, res){
	let q = req.query;
	let user = q.user, signature = q.signature, reqTime = q.reqTime;
	if(authenticate(user, signature, reqTime) == false){
		console.log('authentication failed');
	}
	else{
		// mutex lock
		const release = await mutex.acquire();
		fs.readFile(processInfo_path, function(err, d){
			var data = d;
			release();
			// mutex unlock
			data = JSON.parse(data);
			data.PROCESS = data.PROCESS.filter(entry => entry.owner == user)
			res.writeHead(200, {'Context-Type': 'application/json'});
			// console.log(data);
			res.write(JSON.stringify(data));
			res.end();
		});
	}
});


// for killp command
app.post(CMD_KILL, bodyParser.json(), async function(req, res){
	console.log(req.body);
	let user = req.body.user, pid = req.body.pid, signature = req.body.signature, reqTime = req.body.reqTime;
	
	if(authenticate(user, signature, reqTime) == false){
		console.log("authentication failed\n");
	}
	else{
		let result = await kill.killp(user, pid, reqTime);
			console.log('result = ', result)
		res.writeHead(200, {'Context-Type': 'text/plain'});
		res.write(JSON.stringify({"status": result}));
		res.end();
	}

});


// create server
var server = app.listen(port, function () {
	console.log("Server running at http://%s:%s\n", server.address().address, server.address().port);
})


async function fetchInfo(path){
	const release = await mutex.acquire();
	try{
		fetch.fetchInfo(path);
	} finally{
		release();
	}
}

setInterval(fetchInfo, 1000, processInfo_path);
