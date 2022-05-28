import { Collapse } from "antd";
import ServerPanel from "./ServerPanel";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
let mocked_data = [
  {
    host: "server 1",
    // N cores, N items, unit: %
    CPUS: [0, 0, 10.9, 20],
    // unit: MB
    MEM_USE: 4096,
    MEM_TOT: 16384,
    PROCESS: [
      {
        pid: 12345,
        owner: "userA",
        cpu: 10.9, // %
        mem: 1024, // MB
        cmd: "python3 -m http.server 8080",
      },
      {
        pid: 12456,
        owner: "userB",
        cpu: 20, // %
        mem: 3072, // MB
        cmd: "python3 train.py",
      },
    ],
  },
  {
    host: "server 2",
    // N cores, N items, unit: %
    CPUS: [0, 0, 10.9, 10],
    // unit: MB
    MEM_USE: 3072,
    MEM_TOT: 16384,
    PROCESS: [
      {
        pid: 12345,
        owner: "userC",
        cpu: 10.9, // %
        mem: 1024, // MB
        cmd: "python3 -m http.server 8080",
      },
      {
        pid: 12456,
        owner: "userD",
        cpu: 10, // %
        mem: 2048, // MB
        cmd: "python3 train.py",
      },
    ],
  },
];
const ServerTable = () => {
  return (
    <Collapse defaultActiveKey={["1"]}>
      {mocked_data.map((x, i) => {
        return (
          <Panel header={x["host"]} key={i}>
            <ServerPanel data={x} />
          </Panel>
        );
      })}
    </Collapse>
  );
};
export default ServerTable;
