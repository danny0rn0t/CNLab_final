import json
from flask import Flask, jsonify
import configparser
import configparser
import os
from pymongo import MongoClient
from flask_apscheduler import APScheduler
from utils import query_server_for_record

app = Flask(__name__)
config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))

@app.route('/', methods=['GET'])
def query_records():
    pass

@app.route('/', methods=['POST'])
def kill_process():
    pass

if __name__ == '__main__':
    # app.run()
    path = f"{config['SERVER']['base_url']}:{config['SERVER']['port']}/{config['SERVER']['info_path']}"
    query_server_for_record(path)