import React from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { setEndTower, buildTowers } from '../../../../actions/game_actions';
import { enableModal } from '../../../../actions/ui_actions';
import { createArrayOfLength } from '../../../../util/general_util';
import { towersAreChanged } from '../../../../util/game_util';
import Tower from './tower';
import Modal from './modal';

const msp = (state) => {
  const { discsNum, discs, moves, minMoves } = state.game;
  return {
    discsNum,
    discs,
    moves,
    minMoves,
    mode: state.ui.mode,
  }
};

const mdp = (dispatch) => ({
  setEndTower: (tower) => dispatch(setEndTower(tower)),
  buildTowers: () => dispatch(buildTowers()),
  enableModal: (mode) => dispatch(enableModal(mode)),
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      discsNum: this.props.discsNum
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), this.props.delay);
  }

  componentWillReceiveProps(nextProps) {
    if (towersAreChanged(this.props.discs, nextProps.discs)) {
      this.setState({ discsNum: nextProps.discsNum });
    }
  }
  
  componentDidUpdate() {
    if (Object.values(this.props.discs).every(tower => tower.length === 0)) {
      this.props.buildTowers();
    } else if (this.props.discs[2].length === this.props.discsNum && this.props.mode !== 'game-over') {
      setTimeout(() => this.props.enableModal('game-over'), 3000);
    };
  }

  startGame() {
    return (
      createArrayOfLength(3).map((n) => (
        <Tower key={n} 
               idx={n} 
               delay={this.props.delay + 500}
               totalDiscsNum={this.state.discsNum} 
               noOfDiscs={n === 0 ? this.state.discsNum : 0} 
               setEndTower={(tower) => this.props.setEndTower(tower)}
               />
      ))
    );
  }
    
  render() {
    return (
      <div id="playground" className={this.state.loaded ? '' : 'hidden'}>
        {this.startGame()}
        <Modal klass={this.props.mode} moves={this.props.moves} minMoves={this.props.minMoves} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(connect(msp, mdp)(Game));
