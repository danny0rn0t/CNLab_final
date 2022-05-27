import json
from flask import Flask, jsonify
import configparser
import os
from pymongo import MongoClient
from flask_apscheduler import APScheduler
from utils import *
import argparse
app = Flask(__name__)

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', type=str, default='0.0.0.0')
    parser.add_argument('--port', type=int, default=5000)
    args = parser.parse_args()
    return args


@app.route('/server-records', methods=['GET'])
def query_records():
    if not valid_user(db, requests.args.get('username'), requests.ars.get('password')):
        return None

@app.route('/', methods=['POST'])
def kill_process():
    pass

if __name__ == '__main__':
    # app.run()
    args = parse_args()
    config = configparser.ConfigParser()
    config.read(os.path.abspath(os.path.join(".ini")))
    client = MongoClient(config['PROD']['DB_URI'])
    db = client['cnlab']
    print(type(db))


    # path = f"{config['SERVER']['base_url']}:{config['SERVER']['port']}/{config['SERVER']['info_path']}"
    # query_server_for_record(path)