const si = require('systeminformation');
const Locker = require('node-file-lock');
const fs = require('fs');


const fetchInfo = async (path) => {
    mem_info = si.mem()
    load_info = si.currentLoad()
    process_info = si.processes()
    mem_info = await mem_info
    load_info = await load_info
    process_info = await process_info
    
    ret = {}
    ret['cpus'] = []
    for (let cpu of load_info['cpus'])
        ret['cpus'].push(Math.round(cpu['load'] * 100)/100)

    const MB = 1024*1024
    ret['MEM_USE'] = Math.round(mem_info['active']/MB)
    ret['MEM_TOT'] = Math.round(mem_info['total']/MB)

    ret['PROCESS'] = []
    for (let process of process_info['list'])
        ret['PROCESS'].push({
            'pid': process['pid'],
            'cpu': process['cpu'],
            'owner': process['user'],
            'mem': Math.round(process['memRss']/MB),
            'command': process['command']
        })
    let lock = new Locker(path);
    content = JSON.stringify(ret)
    fs.writeFile(path, content, 'utf8', (err)=>{
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    })
    lock.unlock()
}

exports.fetchInfo = fetchInfo
// Usage
//fetchInfo("./info.json")

