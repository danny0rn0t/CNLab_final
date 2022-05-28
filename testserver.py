from flask import Flask, jsonify
import time
import argparse
app = Flask(__name__)

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', type=str, default='0.0.0.0')
    parser.add_argument('--port', type=int, default=5000)
    parser.add_argument('--id', type=str, required=True)
    args = parser.parse_args()
    return args

@app.route('/api/fetchInfo', methods=['GET'])
def query_records():
    data = {
        "time_stamp": time.ctime(),
        "host": f'Server {args.id}',
        "CPUS": [0, 0, 10.9, 20],
        "MEM_USE": 4096,
        "MEM_TOT": 16384,
        "PROCESS":[
            {
            "pid": 12345,
            "owner": "userA",
            "cpu": 10.9,    
            "mem": 1024,   
            "cmd": "python3 -m http.server 8080"
            },
            {
            "pid": 12456,
            "owner": "userB",
            "cpu": 20,    
            "mem": 3072,   
            "cmd": "python3 train.py"
            }
        ]
    }
    return jsonify(data)
if __name__ == '__main__':
    args = parse_args()
    app.run(host=args.host, port=args.port)