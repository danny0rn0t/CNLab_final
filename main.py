import json
from flask import Flask, jsonify, request
from config import Config
import os
from pymongo import MongoClient
from flask_apscheduler import APScheduler
from utils import *
import argparse
import requests
app = Flask(__name__)
scheduler = APScheduler()

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', type=str, default='0.0.0.0')
    parser.add_argument('--port', type=int, default=5000)
    args = parser.parse_args()
    return args


@app.route('/server-records', methods=['GET'])
def query_records():
    if not valid_user(db, request.args.get('username'), request.args.get('password')):
        return gen_reponse('FAILED', error_message='Invalid user!')
    data = get_records(db)
    return gen_reponse('SUCCESSED', data=data)
    

@app.route('/kill-process', methods=['POST'])
def kill_process():
    username = request.values.get('username')
    password = request.values.get('password')
    if not valid_user(db, username, password):
        return gen_reponse('FAILED', error_message='Invalid user!')
    server_id = request.values.get('server_id')
    pid = request.values.get('pid')
    if server_id is None:
        return gen_reponse('FAILED', error_message='Missing server_id!')

    collection = db['servers']
    server = collection.find_one({'server_id': server_id})
    if server is None:
        return gen_reponse('FAILED', error_message=f'Server with server_id={server_id} not found!')
    


if __name__ == '__main__':
    ''' set up configs '''
    args = parse_args()
    config = Config()

    ''' connect to mongodb '''
    client = MongoClient(config.DB_URI)
    db = client['cnlab']

    ''' init database '''
    init_db(db, config)

    ''' update record for every 5 seconds'''
    scheduler.add_job(id = 'Scheduled Task', func=update_records, trigger="interval", seconds=5, args=[db])
    scheduler.start()

    app.run()


    # path = f"{config['SERVER']['base_url']}:{config['SERVER']['port']}/{config['SERVER']['info_path']}"
    # query_server_for_record(path)