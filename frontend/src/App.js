import "antd/dist/antd.min.css";
import "./App.css";
import { useState } from "react";
import Login from "./Containers/Login";
import Layout from "./Containers/Layout";
function App() {
  const [is_login, setLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState("");
  return is_login ? (
    <Layout user={user} pw={pw} setLogin={setLogin} />
  ) : (
    <Login
      user={user}
      pw={pw}
      setUser={setUser}
      setPw={setPw}
      setLogin={setLogin}
    />
  );
}

export default App;
