import { Collapse, message } from "antd";
import ServerPanel from "./ServerPanel";
import axios from "axios";
import { useEffect, useState } from "react";
const { Panel } = Collapse;

const ServerTable = ({ user, pw }) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setRefresh(true);
    }, 10 * 1000);
  }, []);
  useEffect(() => {
    if (refresh) {
      const fetchServers = async () => {
        let { data: res } = await axios.get("http://localhost:5000/server-records", {
          params: {
            username: user,
            password: pw,
          },
        });
        if (res.status === "SUCCESSED") setData(res.data);
        else message.error(res.message);
      };
      fetchServers();
      setRefresh(false);
    }
  }, [refresh, user, pw]);
  return (
    <Collapse defaultActiveKey={["0"]}>
      {data.map((x, i) => {
        return (
          <Panel header={x["Server_name"]} key={i}>
            {x["records"] ? (
              <ServerPanel
                setRefresh={setRefresh}
                user={user}
                pw={pw}
                data={x}
              />
            ) : (
              "No data"
            )}
          </Panel>
        );
      })}
    </Collapse>
  );
};
export default ServerTable;
