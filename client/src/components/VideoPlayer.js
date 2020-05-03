import React, {useState, useEffect, useRef} from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button, Input } from '@material-ui/core';

const VideoPlayer = function({url, playing, playedSeconds, updateVideoState, syncVideo}) {

    const myRef = useRef();

    const [timeStamp, setTimeStamp] = useState({play: 0, pause: 0})

    // useEffect(()=> {
    //     if (Math.abs(timeStamp.play - timeStamp.pause) < 1) {
    //         console.log("seeking...");
    //         syncVideo(timeStamp.play, myRef)
    //     }
    // }, [timeStamp.play, timeStamp.pause])
    // 'https://www.youtube.com/watch?v=ysz5S6PUM-U'



    useEffect(() => {
        // myRef.current.seekTo(videoState.playedSeconds, "seconds");
        if (playedSeconds && myRef && myRef.current && myRef.current.getCurrentTime()) {
            console.log('current time', myRef.current.getCurrentTime(), typeof myRef.current.getCurrentTime(), 'state time', playedSeconds, typeof playedSeconds);
            if (Math.abs(myRef.current.getCurrentTime().toFixed(0) - playedSeconds.toFixed(0)) > 1) {
                console.log("seeking to", playedSeconds);
                myRef.current.seekTo(playedSeconds, "seconds");
            }
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
        console.log("ready...", event);
        // if (myRef && myRef.current) {
        //     console.log('current time', myRef.current.getCurrentTime(), 'state time', playedSeconds);
        //     myRef.current.seekTo(0, "seconds");
        // }
    }
    const onPlay = function(event) {
        console.log("playing...");
        syncVideo(myRef.current.getCurrentTime(), myRef)
        updateVideoState({playing: true});
        setTimeStamp((prev) => {
            return {...prev,
            play: myRef.current.getCurrentTime()}
        })
    }
    const onPause = function(event) {
        console.log("pausing...");
        // syncVideo(myRef.current.getCurrentTime(), myRef)
        updateVideoState({playing: false});
        setTimeStamp((prev) => {
            return {...prev,
            pause: myRef.current.getCurrentTime()}
        })

    }


    
    return (
        <ReactPlayer ref={myRef} url={url} controls playing={playing} onPlay={onPlay} onPause={onPause} onReady={onReady}/>
    )
}

export default VideoPlayer;