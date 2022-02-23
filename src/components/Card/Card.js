import React from 'react'
import { withRouter, Link } from "react-router-dom";

//material-ui core
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import "../../assets/styles/scss/card.scss"
const BadgeCode = (props) => {
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        style={{ alignItems: "center", display: "flex" }}
      >
        <Grid item>
          <div className="category-shortname">
            Brain-G
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export const GameCard = (props) => {
  return (
    <>
      {!props.page ? (
        <div className="card-game">
          <Link to={props.url}>
            <Card className="element-card-question">
              <Grid container className="card-question-practice">
                <Grid item xs={12} className="text-uppercase text-dark mb-0">
                  <BadgeCode/>
                  <div className="category-name-title">{props.name}</div>
                  <div
                    style={{
                      textTransform: "none",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ paddingRight: 5 }}>
                      <FiberManualRecordIcon className="dot-small" />
                      <FiberManualRecordIcon className="dot-small" />
                      <FiberManualRecordIcon className="dot-small" />
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="card-image" style={{display: "flex", justifyContent: "center"}}>
                <img src={props.img} alt="" style={{width: "90%", height: "250px"}}/>
              </div>
            </Card>
          </Link>
        </div>
      ) : (
        <div className="card-game">
          <a href={`${props.page}`}>
            <Card className="element-card-question">
              <Grid container className="card-question-practice">
                <Grid item xs={12} className="text-uppercase text-dark mb-0">
                  <BadgeCode/>
                  <div className="category-name-title">{props.name}</div>
                  <div
                    style={{
                      textTransform: "none",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ paddingRight: 5 }}>
                      <FiberManualRecordIcon className="dot-small" />
                      <FiberManualRecordIcon className="dot-small" />
                      <FiberManualRecordIcon className="dot-small" />
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="card-image" style={{display: "flex", justifyContent: "center"}}>
                <img src={props.img} alt="" style={{width: "90%", height: "250px"}}/>
              </div>
            </Card>
          </a>
        </div>
      )}
    </>
  );
};
