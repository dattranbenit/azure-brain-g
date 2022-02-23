import React from 'react';
import { connect } from 'react-redux'
import { restartGame } from '../../../../actions/game_actions'
import { enableModal } from '../../../../actions/ui_actions'

const msp = (state) => (state.game);

const mdp = (dispatch) => ({
  restartGame: () => dispatch(restartGame()),
  enableModal: (mode) => dispatch(enableModal(mode)),
});

class Button extends React.Component {
  handleClick() {
    this.props.restartGame();
    this.props.enableModal('loading');
  }
  
  render() {
    return (
      <button className="game-starter" onClick={() => this.handleClick()}>{this.props.klass}</button>
    );
  }
}

export default connect(msp, mdp)(Button);
