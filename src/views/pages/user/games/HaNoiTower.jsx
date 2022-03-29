import React from 'react';
import Header from '../../components/HaNoiTower/header';
import Panel from '../../components/HaNoiTower/panel/panel';
import Game from '../../components/HaNoiTower/game';
import '../../../../assets/styles/css/hanoi-tower/reset.css';
import '../../../../assets/styles/css/hanoi-tower/index.css';

class HaNoiTower extends React.Component {
  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className="app" style={{cursor: "pointer"}}>
          <Header delay={400}/>
          <Panel delay={100}/>
          <Game delay={300}/>
        </div>
      </div>
    );
  }
}

export default HaNoiTower;
