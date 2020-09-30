import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TrackVisibility from 'react-on-screen';
import { Animator, AnimatedObject, API } from "helpers";
import Plyr from 'plyr';


const VideoStory = (props) => {
  const [player, setPlayer] = useState();
  useEffect(() => {
    if (player === undefined) setPlayer(new Plyr(document.getElementById(props.video._id),
      {
        playsinline: true,
        clickToPlay: false,
        controls: ["play", "progress", "fullscreen", "settings"],
        fullscreen: {
          iosNative: true
        }
      }));
    else {
      let sources = [];
      props.video.videos.forEach((video) => {
        sources.push({
          src: video.link,
          type: 'video/mp4',
          size: video.width,
        });
      });
      player.source = {
        type: "video",
        title: props.video.title,
        sources,
        poster: props.video.thumbnail
      };

    }
    return () => {
      if (player !== undefined)
        player.destroy();
    };
  }, [props.video, player]);
  useEffect(() => {
    if (player !== undefined)
      if (props.isVisible === false)
        player.pause();

  }, [props.isVisible, player]);
  return (<video id={props.video._id} />);
};

VideoStory.propTypes = {
  video: PropTypes.object,
  isVisible: PropTypes.bool
};

export const VideoStories = () => {
  const [videoStories, setVideoStories] = useState([]);
  const desktop = useMediaQuery('(min-width:1024px)');

  useEffect(() => {
    API.getVideoStories((data) => {
      setVideoStories(data);
      Animator.init();
    });
    return () => {
      Animator.destroy();
    };
  }, []);
  return <div style={{ width: "100%" }}>
    <AnimatedObject initial="top">
      {videoStories.map((video, index) => {
        return <section key={`videoStory${index}`} style={index === videoStories.length - 1 && !desktop ? {
          paddingBottom: "20vh"
        } : {}} className="slide">
          <div className="hero-img">
            <TrackVisibility partialVisibility >
              {
                ({ isVisible }) => <VideoStory isVisible={isVisible} video={video} className="videoPlayer" />
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
            <div className="reveal-text"></div>
          </div>
        </section>;
      })}
    </AnimatedObject>
  </div>;
};