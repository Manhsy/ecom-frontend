import styled, { css } from "styled-components";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 10px;
  height: 10px;
  padding: 10px;

  ${(props) =>
    props.available &&
    css`
      background: #32cd30;
    `}

  ${(props) =>
    props.limited &&
    css`
      background: #fad02c;
    `}

    ${(props) =>
    props.unavailable &&
    css`
      background: #ff0000;
    `}
`;

export default TrafficLight;
