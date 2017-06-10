const vars = {
  colorBlack: '#141515',
  colorBlue: '#31a4de',
  colorGreyLight: '#ccc',
  colorGreyMed: '#dBdBdB',
  colorGreyDark: '#1e1f20',
  colorPurple: '#e025f8',
  colorWhite: '#fff',
  fontFamilyBold: '"Gilroy-Bold", "Helvetica Neue", Arial, sans-serif',
  fontFamilyRegular: '"Gilroy-Regular", "Helvetica Neue", Arial, sans-serif',
  fontSizeSM: 12,
  fontSizeMD: 16,
  fontSizeLG: 24, /* calc(var(font-size )* 1.5) */
  fontSizeXL: 48, /* calc(var(font-size) * 3 )*/
  fontSizeXXL: 80, /* calc(font-size * 5 )*/
  fontSizeXXXL: 120, /* calc(font-size * 7.5) */
  radius: 10,
  spacingXS: 8,
  spacingSM: 12,
  spacingMD: 16,
  spacingLG: 48, /*calc(var(spacing) * 1.5),*/
  spacingXL: 56,  /*calc(var(spacing) * 3);*/
  spacingXXL: 80,   /*calc(var(spacing) * 5)*/
  h1Baseline: 172,
  h2Baseline: 35,
  buttonWidth: 188,
  buttonWidthSM: 96,
  buttonHeight: 56,
  buttonFill: 'rgba(255, 255, 255, 0.07)',
  buttonFillHover: 'rgba(255, 255, 255, 0.02)'
};

const button = {
  box: {
    fill: vars.buttonFill
  },
  text: {
    fill: vars.colorPurple,
    fontFamily: vars.fontFamilyBold,
    fontSize: vars.fontSizeMD,
    letterSpacing: 0.5
  }
};

const darkButton = {
  box: {
    fill: vars.colorBlack
  },
  text: {
    fill: vars.colorWhite,
    fontFamily: vars.fontFamilyBold,
    fontSize: vars.fontSizeMD,
    letterSpacing: 0.5
  }
};

const h1 = {
  fontFamily: vars.fontFamilyBold,
  fontSize: vars.fontSizeXXL,
  lineSpacing: 66.5279975,
  letterSpacing: -1.48148155,
  fill: vars.colorWhite
};

const h1Mobile = {
  fontFamily: vars.fontFamilyBold,
  fontSize: vars.fontSizeMD,
  lineSpacing: vars.fontSizeMD,
  letterSpacing: -0.5,
  fill: vars.colorWhite
};

const h2 = {
  fontFamily: vars.fontFamilyBold,
  fontSize: vars.fontSizeXL,
  lineSpacing: vars.fontSizeXL,
  letterSpacing: -0.888888896,
  fill: vars.colorPurple
};

const h3 = {
  fontFamily: vars.fontFamilyBold,
  fontSize: 18,
  lineSpacing: 18,
  letterSpacing: 0.5,
  fill: vars.colorPurple,
  textTransform: 'uppercase'
};

const label = {
  fontFamily: vars.fontFamilyRegular,
  fontSize: vars.fontSizeMD,
  fontWeight: 'normal',
  fill: vars.colorGreyLight,
  lineSpacing: 24
};

const link = {
  fontFamily: vars.fontFamilyBold,
  fontSize: vars.fontSizeMD,
  lineSpacing: vars.spacingMD * 2,
  letterSpacing: -0.400000125,
  fill: vars.colorPurple
};

const ticks = {
  stroke: vars.colorGreyLight,
  strokeWidth: 0.5,
  strokeDasharray: '1,6',
  strokeOpacity: 0.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const ticksPrimary = {
  ...ticks,
  stroke: vars.colorWhite,
  strokeOpacity: 0.8,
  strokeWidth: 1
};

export default {
  button,
  darkButton,
  h1,
  h1Mobile,
  h2,
  h3,
  label,
  link,
  ticks,
  ticksPrimary,
  vars
};
