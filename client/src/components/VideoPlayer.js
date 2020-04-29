import React from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button, Input } from '@material-ui/core';

const VideoPlayer = function(props) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        }
    };
    const _onReady = function(event) {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
        console.log(event.target);
      }

    return (
        <>
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing opts={opts} onReady={_onReady}/>
            <form>
                <Input placeholder="Enter Link" inputProps={{ 'aria-label': 'Enter Link' }} required/>
                <Button variant="contained" color="primary">Load</Button>
            </form>
        </>

    )
}

export default VideoPlayer;