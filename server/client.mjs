import {createRequire} from 'module';
import fetch from "node-fetch";

const require = createRequire(import.meta.url);
var http = require('http');
var cryptojs = require('crypto-js');

var port = 8888;
var signature = cryptojs.SHA256('user13.5user1SecrET').toString(cryptojs.enc.Hex);
var killpUrl = 'http://127.0.0.1:'+ port + '/api/killp';
var fetchUrl = 'http://127.0.0.1:'+ port + '/api/fetchInfo?user=user1&pid=1234&reqTime=3.5&signature='+signature;


function requestInfo(url) {
	fetch(url, {method:'GET'})
	.then(res => {
		return res.json();
	}).then(result => {
		console.log("result = ", result);
	});
}

function requestKill(url) {
	fetch(url, {
		method:'POST',
		body:JSON.stringify({
			user:'user1',
			pid:1234,
			reqTime:3.5,
			signature: signature
		}),
		headers: {
			'Content-Type':'application/json'
		}
	}).then(res => {
		return res.text();
	}).then(result => {
		console.log(result);
	});
}
setInterval(requestInfo, 3000, fetchUrl);
setInterval(requestKill, 5000, killpUrl);

