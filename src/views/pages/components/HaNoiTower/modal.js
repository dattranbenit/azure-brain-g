import React from 'react';
import { connect } from 'react-redux';
import Button from './button';
import Loader from '../../../../assets/img/loader.gif'

const msp = (state) => ( state.ui )

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.noneStyle = {
      display: 'none',
    }
  }
  
  renderModal() {
    switch(this.props.klass) {
      case 'loading':
        return <img id="loader" src={Loader} alt="Loading"></img>;
      case 'game-over':
        const message = this.props.moves === this.props.minMoves ? "Wow! That was the perfect solution!" : "Congrats! You could do better though! ;)";
        return (
          <div id="modal">
            <p id="modal-message">{message}</p>
            <Button klass="play again"/>
          </div>
        )
      default:
        return ;
    }
  }

  render() {
    return (
      <div id={`${this.props.klass === "loading" ? "loader" : "modal"}-container`} style={this.props.mode ? {}: this.noneStyle}>
        {this.renderModal()}
      </div>
    );
  }
}

export default connect(msp, null)(Modal);
