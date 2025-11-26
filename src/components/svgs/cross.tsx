import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

const CrossSvg = () => (
  <Svg width={22} height={22} fill="none">
    <Path fill="url(#a)" d="M0 0h22v22H0z" />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAEAQAAAA5p3UDAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAAAYAAAAGAA8GtCzwAAAAd0SU1FB+cBBAgUGqhIQOoAAAQUSURBVHja7ZzNTuJQGIZPXbHiAoAb0qCpibppvBkTdxKvRHEBBr0OI/6s3GlEFrBAI5x3FmUmM87IAP0533fO+6zb5v35eqDQ1pg5QBQBBwfA1RUwHALv78DDA2yrBdTrhqgCttEATk+Bx0fg4wN4ewN6Pdi9PSCKvmxcrcJeXuJbxmMgjl2bIssB7O6mnX1Htwtbrc433thYXP5PplMgSVybI4sBkiTt6n90u0AUmXTZXxYOgWSWL3+O3d83sNfXyw/AfAjs4aFrs+RP0hP583O1Lns9k37hWxWuBJJY+cz/xWBg0m/768AhkMD65QPAZGKA+/v1duYQuCZb+QBsv2/S6/wscAhckLl8ALCtlgHq9cXXjBwCaeRSPkYjoFabHzCOsx+QQ1AG+ZQ/nf71w956lxH/ODAvEQuj8I44BHIprRsOgTxK74RDIAdnXXAI3OO8A+cCAkZM9mKEBIS4zMUJ8hixWYsV5hHiMxYvUDFqslUjVBHqMlUnWDBqs1QrXBDqM1RvwCHeZOeNEWZGQ8yKxpgRDTIbGmUmNMwsaJwZMAB6ZxD0zEDolcHQIwMK1xuDCtATAwvQC4ML0INTNAeoWbsoNAapUbNoNAWqSasqNASrQaNqJAcsWZtXSAxaoiavkRS4JC1BISF4CRqCxmUBLF8ILopg+cIosxCWL5QyimH5wimyIJavhCKKYvnKyLMwlq+UfIqbzXJ58TLLd0M+Q8DyVeNuCFi+GMofApYvjvKGgOWLpfghYPniKW4IWL4a8h8Clq+OdAiyXuMDwGzmc/kbrgUQkjv8CAgYfgkMGF4GBgx/CAoY/hQcMPwzKGD4d3DA8IaQgOEtYQHDm0IDhreFBwwfDAkYPhoWMHw4NGD4eHjASChAgoYgkRS8JC1BIDFwiZq8RHLQkrV5gYaANWhUiaZgNWlVgcZANWoWieYgNWsXgQ8B+uCBwdELA6MnBkVvDIgeGQy9MhB6ZhD0zgCYAY0zCxpmJjTKbGiQGYVrjFkFaIiZBWiE2QVoQABqM1QrXCDqslQnWAFqMlUjVCHisxUv0APEZixWmIeIy1qcoAAQk7kYIQHiPHvnAoi7Dli+HErvguXLo7ROWL5cCu+G5cunsI5gm81cXpqMJHEdku8ASZLPC66bzfSAttEABgOWr4d8hmAwAOp1AxwfZ58mLvtlk8/HwdGRAW5veebrJPtKcHNjgOGQZ75eMq0E9vXVAC8vPPN1s/5K8PxsgPNznvn6WWslsGdnBtjZ4ZnvByuvBHZ7e77jxQXL94Plh6Dd/m2nSgVot7/feDQC4ti1ObIcQBwD4/GipR+oVL7sFEXA1hbQ6QBPT8BkAtvvw56cALWaa1NkNYB6HbbVAu7ugMkk7bTTATY3gSj6ud0P5/wan9+/A4IAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDEtMDRUMDg6MjA6MjYrMDA6MDAVrV+GAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAxLTA0VDA4OjIwOjI2KzAwOjAwZPDnOgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMS0wNFQwODoyMDoyNiswMDowMDPlxuUAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
);

export default CrossSvg;
