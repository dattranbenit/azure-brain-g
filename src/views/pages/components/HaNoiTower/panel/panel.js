import React from 'react';
import { connect } from 'react-redux'
import Info from './info';
import Button from '../button';

const msp = (state) => (state.game);

const mdp = (dispatch) => ({
  
});

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded1: false,
      loaded2: false
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loaded1: true}), this.props.delay);
    setTimeout(() => this.setState({ loaded2: true}), this.props.delay + 500);
  }

  render() {
    return (
      <div id='panel' className={this.state.loaded1 ? "" : "hidden"}>
        <div id='game-info' className={this.state.loaded2 ? "" : "hidden"}>
          <Info klass='discs'/>
          <Info klass='moves'/>
        </div>
        <div id='buttons' className={this.state.loaded2 ? "" : "hidden"}>
          <Button klass='restart'/>
        </div>
      </div>
    );
  }
}

export default connect(msp, mdp)(Panel);