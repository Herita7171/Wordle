import { connect } from 'react-redux';
import AppGame from '../pages/AppGame.js'
import {
  inputSubmit,
  inputChange,
  reloadWord
} from '../redux/modules/GameModel';

function mapStateToProps(state) {
  return {
    GameModel: state.GameModel // gives our component access to state through props.
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputChange: (value) => dispatch(inputChange(value)),
    inputSubmit: (value) => dispatch(inputSubmit(value)),
    reloadWord: (value) => dispatch(reloadWord(value))
  }; // mapping actions to props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppGame);