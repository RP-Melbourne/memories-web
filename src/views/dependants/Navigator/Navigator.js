import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { AnimatedObject } from "helpers/index";
import { HeaderContext } from "contexts";
import * as navigatorBG from "assets/img/navigatorBG.png";

const useStyles = makeStyles(() => ({
  sidenav: {
    zIndex: 99,
    '& .MuiButton-label': {
      justifyContent: 'left'
    },
    '& a': {
      position: "absolute",
      left: window.innerWidth - 150,
      transition: "0.3s",
      padding: "15px",
      width: "200px",
      textDecoration: "none",
      color: 'black',
      borderRadius: '5px 0 0 5px',
    },
    '& a:hover': {
      left: window.innerWidth - 200
    }
  }
}));

const ButtonWithLink = (props) => {
  const { setDisplayBackButton } = useContext(HeaderContext);

  let button = (
    <Button lableStyle={{ float: 'left', justifyContent: "left" }} onClick={() => {
      setDisplayBackButton(true);
    }} style={{
      top: ((window.innerHeight / 2) - (window.innerHeight / 6)) + props.index * 60,
    }} fullWidth variant="contained" component={Link} to={props.to}>
      {props.children}
    </Button>
  );
  return button;
};

const SideNav = () => {
  const classes = useStyles();
  return (
    <div id="navigationSidebar" className={classes.sidenav}>
      <ButtonWithLink index={0} to="documentary">
        Documentary
      </ButtonWithLink>
      <ButtonWithLink index={1} to="videostories">
        Video Stories
      </ButtonWithLink>
      <ButtonWithLink index={2} to="memorywalks">
        Memory Walks
      </ButtonWithLink>
      <ButtonWithLink index={3} to="archive">
        archive
      </ButtonWithLink>
      <ButtonWithLink index={4} to="plaza">
        Plaza
      </ButtonWithLink>
    </div>
  );
};

export const Navigator = () => {
  const [videoLink] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories-prod/video/video/original/Video_zcgoScQXxDV0.mp4");
  const { setDisplayBackButton } = useContext(HeaderContext);
  useEffect(() => {
    setDisplayBackButton(false);
    document.getElementById('animationContainer').style = {
      transform: "none",
      opacity: 1,
      position: "unset"
    };
  }, [setDisplayBackButton]);
  let router = (
    <AnimatedObject initial="fade" >
      <div style={{
        position: "relative",
        backgroundImage: `url(${navigatorBG})`,
        backgroundSize: 'cover'
      }} >
        <section className="primary">
          <div className="parallax hero" style={{
            overflow: "hidden"
          }}>
            <video playsInline loop id="homeVideo" muted autoPlay style={{
              height: 'auto',
              minHeight: window.innerHeight + 110,
              maxWidth: window.innerWidth,
              objectFit: "cover"
            }}>
              <source src={videoLink} type="video/mp4" />
          Your browser does not support HTML5 video.
            </video>
            <SideNav />
          </div>
        </section>
      </div>
    </AnimatedObject>
  );
  return router;
};
