import React from 'react';
import { DragSource } from 'react-dnd';

const discSource = {
  beginDrag: (props) => {
    if (props.i > 0) return {};
    console.log('A')
    return {
      startTower: props.tower
    };
  },
  endDrag: (props, monitor) => {
    if (props.i > 0 || !monitor.didDrop()) return {};
    console.log('B');
    props.moveDiscFrom(props.tower);
    props.enableModal('loading');
    return {
      startTower: props.tower
    };
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});


class Disc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      towerHeight: this.props.towerHeight,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), this.props.delay);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.towerHeight !== nextProps.towerHeight) {
      this.setState({ towerHeight: nextProps.towerHeight });
    };
  }
  
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <li className={ this.state.loaded ? "disc" : "disc hidden"} style={this.props.styling}></li>
    );
  }
}

export default DragSource('disc-and-tower', discSource, collect)(Disc);