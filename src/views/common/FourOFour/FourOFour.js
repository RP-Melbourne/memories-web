import React, { useEffect } from 'react';
import { Animator } from "helpers";
import { Grid, Typography } from '@material-ui/core';
import { Image } from 'components';
export const FourOFour = () => {
  useEffect(() => {
    Animator.init();
    // window.removeEventListener("wheel", rotate, { passive: false })
    return Animator.destroy();
  }, []);
  return (<Grid container justify='flex-start' direction='column' alignItems='center'>
    <Grid item xs={12} xl={2} lg={4} md={6} sm={8}>
      <Image src={'https://cdn4.iconfinder.com/data/icons/robot-avatars-flat/60/028_-_404_bot-512.png'} />
    </Grid>
    <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
      <Typography variant="body2" align="center" >
        Try typing pikachu, ufo, homer, fly, spongebob, <a href='https://codepen.io/WeiChiaChang/full/xLQVXm?editors=1100' rel="noopener noreferrer" target="_blank">etc.</a>
      </Typography>
    </Grid>
  </Grid>);
};
