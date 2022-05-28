import { Card } from "antd";
import styled from "styled-components";

const Container = styled(Card)`
  position: absolute;
  width: 25vw;
  display: flex;
  align-items: center;
  justify-items: center;
  height: 45vh;
  top: 27.5vh;
  left: 37.5vw;
  background-color: rgba(68, 136, 0, 0.4);
  border-radius: 10px;
  border-color: #aaaaaa;
  box-shadow: 0px 0px 3px #444444;
`;

export default Container;
