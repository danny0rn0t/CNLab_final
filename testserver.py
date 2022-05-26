from flask import Flask, jsonify

app = Flask(__name__)
PORT = 5000

@app.route('/api/fetchInfo', methods=['GET'])
def query_records():
    data = {
        "host": 'Server1',
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
    app.run()