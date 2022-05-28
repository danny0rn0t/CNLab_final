import { Button, Table } from "antd";
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
    dataIndex: "cmd",
    key: "cmd",
  },
  {
    title: "",
    dataIndex: "",
    key: "x",
    render: () => <Button primary>Kill</Button>,
  },
];
const CustomTable = ({ data }) => {
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
