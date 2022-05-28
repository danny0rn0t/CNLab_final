import "antd/dist/antd.min.css";
import { Breadcrumb, Col, Layout, Menu, message } from "antd";
import Logo from "../Components/Logo";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ServerTable from "./ServerTable";
const { Header, Content, Footer } = Layout;
const CustomLayout = ({ setLogin, token }) => {
  let location = useLocation();
  const [active, setActive] = useState(0);
  return (
    <Layout>
      <Header
        className="header"
        style={{
          backgroundColor: "rgb(68, 136, 0)",
          justifyItems: "flex-end",
          display: "flex",
        }}
      >
        <Col span={12}>
          <Logo>CNL9</Logo>
        </Col>
        <Col span={10} />
        <div
          style={{
            color: "#ffffff",
            backgroundColor:
              active === 1 ? "rgb(88, 156, 0)" : "rgb(68, 136, 0)",
            paddingLeft: "17px",
            paddingRight: "17px",
            userSelect: "none",
            cursor: "pointer",
          }}
          onMouseEnter={() => setActive(1)}
          onMouseLeave={() => setActive(-1)}
        >
          Logout
        </div>
      </Header>
      <Content
        style={{ height: "88vh", overflow: "auto", padding: "0px 2vw 0px 2vw" }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {location.pathname.split("/").map((x, i) => {
            if (!x.length || i === location.pathname.split("/").length - 1)
              return null;
            return <Breadcrumb.Item key={i}>{x}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <div>
          <Routes>
            <Route path="/" element={<ServerTable />} />
            <Route path="/account/:accountId" element={null} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", maxHeight: "1vh" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
