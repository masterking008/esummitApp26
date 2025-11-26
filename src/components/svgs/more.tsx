import React from 'react';

import Svg, { Defs, Pattern, Use, Image, Path } from 'react-native-svg';

interface IMoreMenuSvgProps {
  style?: any;
}

const MoreMenuSvg = (props: IMoreMenuSvgProps) => {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      style={props.style}>
      <Path fill="url(#a)" d="M0 0h28v28H0z" />
      <Defs>
        <Pattern
          id="a"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#b" transform="scale(.00781)" />
        </Pattern>
        <Image
          id="b"
          width={128}
          height={128}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};

export default MoreMenuSvg;
