import React, {useState, useEffect, useRef} from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button, Input } from '@material-ui/core';

const VideoPlayer = function({url, playing, playedSeconds, updateVideoState, syncVideo}) {

    const myRef = useRef();

    // 'https://www.youtube.com/watch?v=ysz5S6PUM-U'



    useEffect(() => {
        // myRef.current.seekTo(videoState.playedSeconds, "seconds");
        if (playedSeconds && myRef && myRef.current) {
            console.log('current time', myRef.current.getCurrentTime(), 'state time', playedSeconds);
            // if (Math.abs(myRef.current.getCurrentTime() - playedSeconds) > 0) {
            //     myRef.current.seekTo(playSeconds, "seconds");
            // }
        }
    }, [playedSeconds])


    // const opts = {
    //     height: '390',
    //     width: '640',
    //     playerVars: {
    //       // https://developers.google.com/youtube/player_parameters
    //       autoplay: 1,
    //     }
    // };
    
    const onReady = function(event) {
        console.log("ready", event);
        if (playedSeconds && myRef && myRef.current) {
            console.log('current time', myRef.current.getCurrentTime(), 'state time', playedSeconds);
            // if (Math.abs(myRef.current.getCurrentTime() - playedSeconds) > 0) {
            //     myRef.current.seekTo(playSeconds, "seconds");
            // }
        }
    }
    const onPlay = function(event) {
        console.log("playing...");
        updateVideoState({url: url, playing: true});
    }
    const onPause = function(event) {
        console.log("pausing...");
        updateVideoState({url: url, playing: false});
    }


    
    return (
        <ReactPlayer ref={myRef} url={url} controls playing={playing} onPlay={onPlay} onPause={onPause} onReady={onReady}/>
    )
}

export default VideoPlayer;