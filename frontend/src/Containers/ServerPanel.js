import { Col, Row } from "antd";
import ProgressDoughnnut from "./ProgressDoughnut";
import Table from "./Table";

const ServerPanel = ({ data, user, pw, setRefresh }) => {
  return (
    <div style={{ margin: "16px" }}>
      <Row
        align="middle"
        style={{ justifyContent: "center", marginBottom: "15px" }}
      >
        <Col style={{ height: "200px", justifyContent: "center" }}>
          <Row style={{ justifyContent: "center" }}>
            <h4>Memory Usage</h4>
          </Row>
          <ProgressDoughnnut
            data={
              (data["records"]["MEM_USE"] / data["records"]["MEM_TOT"]) * 100
            }
            title={"Memory Usage"}
          />
        </Col>
        {data["records"]["cpus"].map((x, i) => (
          <Col style={{ height: "200px", justifyContent: "center" }}>
            <Row style={{ justifyContent: "center" }}>
              <h4>CPU {i + 1}</h4>
            </Row>
            <ProgressDoughnnut data={x} title={`CPU ${i + 1}`} key={i} />
          </Col>
        ))}
      </Row>
      <Row style={{ width: "100%" }}>
        <Table
          user={user}
          pw={pw}
          data={data["records"]["PROCESS"]}
          server_id={data["server_id"]}
          setRefresh={setRefresh}
        />
      </Row>
    </div>
  );
};
export default ServerPanel;
