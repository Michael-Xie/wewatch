import React, {useState, useEffect, useRef} from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button, Input } from '@material-ui/core';
import VideoPlayer from "./VideoPlayer";
const VideoPlayerSync = function({videoState, updateVideoState, syncVideo}) {
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=ysz5S6PUM-U');
    const onChange = (e) => {
        console.log(e.target.value);
        setUrl(e.target.value);
    };

    function onSubmit(e) {
        e.preventDefault();
        if (url) {
          console.log('onSubmit...'); 
          updateVideoState(url, false);
        }
    }

    return (
        <>
            <VideoPlayer 
                url={url} 
                updateVideoState={updateVideoState} 
                syncVideo={syncVideo} 
                playedSeconds={videoState.playedSeconds? videoState.playedSeconds: 0}
                playing={videoState.playing? videoState.playing: false}
            />
            <form id="changeVideoForm" onSubmit={onSubmit}>
                <Input type="text" placeholder="Enter a video link and watch with friends..." name="link" value={url} onChange={onChange} />
            </form>
        </>
    )
}

export default VideoPlayerSync