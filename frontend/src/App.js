import "antd/dist/antd.min.css";
import "./App.css";
import { useState } from "react";
import Login from "./Containers/Login";
import Layout from "./Containers/Layout";
function App() {
  const [is_login, setLogin] = useState(true);
  return is_login ? (
    <Layout setLogin={setLogin} />
  ) : (
    <Login setLogin={setLogin} />
  );
}

export default App;
