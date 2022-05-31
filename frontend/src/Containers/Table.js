import { Button, Table, message } from "antd";
import axios from "axios";
const CustomTable = ({ data, user, pw, server_id, setRefresh }) => {
  const columns = [
    {
      title: "Pid",
      dataIndex: "pid",
      key: "pid",
    },
    {
      title: "owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "cpu",
      dataIndex: "cpu",
      key: "cpu",
    },
    {
      title: "mem",
      dataIndex: "mem",
      key: "mem",
    },
    {
      title: "cmd",
      dataIndex: "command",
      key: "cmd",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (d) => {
        return (
          <Button
            type="danger"
            ghost
            onClick={async () => {
              const { data: res } = await axios.post(
                "http://localhost:5000/kill-process",
                {},
                {
                  params: {
                    username: user,
                    password: pw,
                    server_id,
                    pid: d.pid,
                  },
                }
              );
              setRefresh(true);
              message.info(res.data.status);
            }}
          >
            Kill
          </Button>
        );
      },
    },
  ];
  return (
    <Table
      scroll={{ y: 770, x: "90vw" }}
      pagination={false}
      columns={columns}
      dataSource={data}
    ></Table>
  );
};
export default CustomTable;
