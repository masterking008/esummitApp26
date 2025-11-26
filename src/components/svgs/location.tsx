import * as React from 'react';
import Svg, { Rect, Defs, Pattern, Use } from 'react-native-svg';
import { Image } from 'react-native';
// import LocationImage from '../../assets/images/location.png'

interface SvgProps {
  width?: number;
  height?: number;
  style?: any;
}
const LocationSvg = (props: SvgProps) => (
  <Image source={require('../../assets/images/location.png')} style={{width: props.width, height: props.height}} />
);
export default LocationSvg;
