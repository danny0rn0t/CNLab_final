import json
from flask import Flask, jsonify
import configparser
import configparser
import os
from pymongo import MongoClient
from flask_apscheduler import APScheduler

app = Flask(__name__)
config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))

@app.route('/', methods=['GET'])
def query_records():
    pass

@app.route('/', methods='POST')
def kill_process():
    pass

if __name__ == '__main__':
    app.run()