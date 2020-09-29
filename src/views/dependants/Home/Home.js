import React, { useEffect, useState } from 'react';
import { Animator } from "helpers";
export const Home = () => {
  const [transationDone, setTransationDone] = useState(false);
  useEffect(() => {
    let body = document.querySelector("body");
    body.removeAttribute("class", "body-archive");
    (async () => {
      await Animator.enter();
      setTransationDone(true);
      await Animator.init(true);

    })();
    return () => {
      document.querySelector("body").removeAttribute("class");
      Animator.destroy();
    };
  }, []);
  if (transationDone === false) return "";
  return (<><section className="primary">
    <div className="parallax hero" style={{
      overflow: "hidden"
    }}>
      <video loop playsInline id="homeVideo" muted autoPlay style={{
        height: 'auto',
        minHeight: window.innerHeight + 110,
        maxWidth: '100%',
        objectFit: "cover"
      }}>
        <source src="https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/video/video/original/Video_DdF4JPKxC1rZ.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
      </video>
      <div className="content hero-title">
        <h2>MEMORIES THAT MAKE US</h2>
        <h3>Storying Italian Migration after the end of the Second World War.</h3>
      </div>
    </div>
  </section>
  <section className="landing-desc ">
    <div className="text-desc" parallax1={"parallax1"}>
      <h3 className="text-split">Memories That Make Us is a project created with the collaboration of Co.As.It., Deakin University and Deakin Launchpad</h3>
    </div>
  </section>
  </>);
};
