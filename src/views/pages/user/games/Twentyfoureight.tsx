import React, { useState } from "react";
import { Button } from "../../components/Twentyfoureight/Button";
import { Game } from "../../components/Twentyfoureight/Game";

import "../../../../assets/styles/less/twentyfoureight/App.less";

/* eslint-disable react/jsx-no-target-blank */
export const Twentyfoureight = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleRestart = () => {
    setDate(new Date());
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center !important"}}>
      <div className="App">
        <div className="header">
          <div>
            <h1 style={{color: "grey"}}>2048 !!!</h1>
          </div>
          <div>
            <Button onClick={handleRestart}>Try Again</Button>
          </div>
        </div>
        <Game key={date.toISOString()} />
      </div>
    </div>
  );
};
/* eslint-enable react/jsx-no-target-blank */
