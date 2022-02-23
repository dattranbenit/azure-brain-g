import React from 'react';
import { connect } from 'react-redux';
import { incrementDiscsNum, decrementDiscsNum } from '../../../../../actions/game_actions';
import { enableModal, removeModal } from '../../../../../actions/ui_actions';

const msp = (state) => (state.game);

const mdp = (dispatch) => ({
  incrementDiscsNum: () => dispatch(incrementDiscsNum()),
  decrementDiscsNum: () => dispatch(decrementDiscsNum()),
  enableModal: (mode) => dispatch(enableModal(mode)),
  removeModal: () => dispatch(removeModal()),
});

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.movesStyle = {
      display: 'flex',
      width: '3.0rem',
      justifyContent: 'space-around'
    };
  }

  handleControl(mode) {
    switch(mode) {
      case "increment":
        this.props.incrementDiscsNum();
        break;
      case "decrement":
        this.props.decrementDiscsNum();
        break;
      default:
        break;
    }
    this.props.enableModal("loading");
    setTimeout(() => this.props.removeModal(), 1000);
  }
  
  renderValueContainer() {
    switch(this.props.klass) {
      case 'discs':
        return (
          <div id='value-container'>
            <p className='label'>{this.props.discsNum}</p>
            <div id='discs-controller'>
              <p className='controller' onClick={() => this.handleControl('increment')}>+</p>
              <p className='controller' onClick={() => this.handleControl('decrement')} style={{transform: 'scale(1.7)'}}>-</p>
            </div>
          </div>
        );
      case 'moves':
        return (
          <p className='label' style={this.movesStyle}><span>{`${this.props.moves}`}</span><span>{`(${this.props.minMoves})`}</span></p>
        );
      default:
        break;
    }
  }

  render() {
    switch (this.props.klass) {
      case 'discs':
        this.label = 'Discs';
        break;
      case 'moves':
        this.label = 'Moves (Min. moves)';
        break;
      default:
        break;
    }
    return (
      <div className='info' onMouseEnter={() => this.setState({ hovered: true })} onMouseLeave={() => this.setState({ hovered: false })}  style={this.props.klass === 'discs' ? { paddingBottom: '1rem' } : {}}>
        <p className={this.state.hovered ? 'label hovered' : 'label'}>{this.label}</p>
        {this.renderValueContainer()}
      </div>
    );
  }
}

export default connect(msp, mdp)(Info);
