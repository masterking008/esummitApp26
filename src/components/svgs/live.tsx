import * as React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

interface ILiveSvgProps {
  width?: number;
  height?: number;
  style?: any;
}

const LiveSvg = (props: ILiveSvgProps) => {
  return (
    <Svg
      width={props.width ? props.width : 50}
      height={props.height ? props.height : 34}
      viewBox="0 0 50 34"
      fill="none"
      style={props.style}>
      <Rect y={7} width={50} height={21} rx={2} fill="#D10000" />
      <Circle cx={9} cy={17} r={4} fill="white" />
      <Path
        d="M19.94 21V14H21.24V19.9H24.9V21H19.94ZM25.9263 21V14H27.2263V21H25.9263ZM31.1409 21L28.0809 14H29.4909L32.2209 20.33H31.4109L34.1709 14H35.4709L32.4209 21H31.1409ZM37.4095 16.91H40.8895V17.98H37.4095V16.91ZM37.5095 19.91H41.4595V21H36.2095V14H41.3195V15.09H37.5095V19.91Z"
        fill="white"
      />
    </Svg>
  );
};

export default LiveSvg;
