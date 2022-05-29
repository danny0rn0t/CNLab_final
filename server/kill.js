const si = require('systeminformation');
const KillProcess  = ([user, pid, reqTime]) =>{

    process_info = si.processes()
    process_info = await process_info
    CheckreqTime = false
    CheckUser = false
    const expireTime = 3;  //second 
    const nowTime = Math.round(new Date().getTime()/1000);  // second 
    if (nowTime - reqTime <= expireTime){
        CheckreqTime = true
    }
    for (let process of process_info['list']){
        if(pid == process['pid'] && user == process['user']){
            CheckUser = true
            break;
        }
    }
    if(CheckreqTime && CheckUser){
        process.kill(pid, 'SIGINT');
        let response = 'kill success'
        return response
    }
    else{
        let response = 'kill failed'
        return response
    }
}
export { KillProcess }




