import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TrackVisibility from 'react-on-screen';
import { Link } from "react-router-dom";
import { Animator } from "helpers";
import { AnimatedObject, API } from 'helpers/index';
import Plyr from 'plyr';


const MemoryWalk = (props) => {
  const [player, setPlayer] = useState();
  useEffect(() => {
    if (props._id)
      if (player === undefined) setPlayer(new Plyr(document.getElementById(props._id),
        {
          playsinline: true,
          clickToPlay: false,
          controls: ["play", "progress", "fullscreen", "settings"],
          fullscreen: {
            iosNative: true
          }
        }));
      else {
        player.source = {
          type: "video",
          title: "test",
          sources: [{
            src: props.url,
            type: 'video/mp4',
          }]
        };
      }
    return () => {
      if (player !== undefined)
        player.destroy();
    };
  }, [props._id, props.url, player]);
  useEffect(() => {
    if (props.isVisible === false)
      if (player !== undefined)
        player.pause();
  }, [props.isVisible, player]);
  return (<video id={props._id} />);
};

MemoryWalk.propTypes = {
  _id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

export const MemoryWalks = () => {
  const [memoryWalks, setMemoryWalks] = useState([]);
  const desktop = useMediaQuery('(min-width:1024px)');

  useEffect(() => {
    API.getMemoryWalks((data) => {
      setMemoryWalks(data);

      Animator.init(true);
    });


    return () => {
      Animator.destroy();
    };
  }, []);
  return <div style={{ width: "100%" }}>
    <AnimatedObject initial="right">

      {memoryWalks.map((video, index) => {
        return <section key={`videoStory${index}`} className="slide" style={{
          marginTop: "5vh !important",
          "@media screen and (max-width: 1024px)": {
            marginTop: "5vh !important"
          },
          '& .plyr': {
            width: "100%",
            margin: 0
          }
        }}>
          <div className="hero-img">
            <TrackVisibility partialVisibility >
              {
                ({ isVisible }) => <MemoryWalk url={video.url} isVisible={isVisible} _id={video._id} className="videoPlayer" />
              }
            </TrackVisibility>
            <div className="reveal-img"></div>
          </div >
          <div className="hero-desc">
            <div className="title">
              <h2>{video.title}</h2>
              <div className="title-swipe t-swipe1"></div>
            </div>
            <p>{video.description} </p>
            <Link to={{
              pathname: `memorywalks/detailed`,
              params: {
                memory: video
              }
            }} className="explore" style={{
              alignSelf: desktop ? 'self-start' : 'auto',
              zIndex: 19
            }}>EXPLORE</Link>
            <div className="reveal-text"></div>
          </div>
        </section>;
      })}
    </AnimatedObject>
  </div>;
};