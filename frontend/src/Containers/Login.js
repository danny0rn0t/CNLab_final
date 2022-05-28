import LoginContainer from "../Components/LoginContainer";
import Logo from "../Components/Logo";
import { Button, message, Row, Space, Input } from "antd";
import { useState } from "react";

const Login = ({ setLogin, setToken }) => {
  const [account, setAccount] = useState(
    localStorage.getItem("save-account") || ""
  );
  const [pw, setPw] = useState(localStorage.getItem("save-pw") || "");
  const login = async () => {};
  return (
    <div
      style={{ backgroundColor: "#ffffff", width: "100vw", height: "100vh" }}
    >
      <LoginContainer bodyStyle={{ width: "100%" }}>
        <Space
          direction="vertical"
          align="center"
          style={{ width: "100%", marginBottom: "2vh" }}
        >
          <Logo style={{ fontSize: "600%", marginLeft: "0" }}>CNL9</Logo>
          <Input
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
            }}
            placeholder="電子郵件帳號"
            size="large"
            style={{ width: "17vw" }}
          />
          <Input.Password
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            placeholder="密碼"
            size="large"
            style={{ width: "17vw" }}
          />
        </Space>
        <Row justify="center" align="middle">
          <>
            <Button
              style={{
                marginTop: "2vh",
                width: "13vw",
                height: "4vh",
                backgroundColor: "#47515e",
                color: "#ffffff",
                borderColor: "rgba(68, 136, 0, 0.5)",
              }}
              size="large"
              onClick={login}
            >
              登入
            </Button>
          </>
        </Row>
      </LoginContainer>
    </div>
  );
};

export default Login;
