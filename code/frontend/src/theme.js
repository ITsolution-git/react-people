import {
  blueGrey100, blueGrey500, blueGrey700,
  pinkA200, tealA100, lightBlue500,
  grey900, white, grey400, darkBlack, lightGreen700, lightGreen100
} from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
  spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#92b558',
    primary2Color: lightGreen700,
    primary3Color: lightGreen100,
    accent1Color: '#CE4A7E',
    accent2Color: tealA100,
    accent3Color: lightBlue500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: pinkA200
  }
}
