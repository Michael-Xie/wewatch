import React, {useState} from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button, Input } from '@material-ui/core';

const VideoPlayer = function({props}) {
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=ysz5S6PUM-U');
    // 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
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
        console.log("onReady", event);
    }

    const _onSubmit = function(event) {
        console.log("before Link", event.target);

        event.preventDefault();
        console.log("Link", event.target);
        setUrl(event.target.value);
    }
    const handleOnChange = (e) => {
        console.log(e.target.value);
        setUrl(e.target.value);
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
      }

    return (
        <>
            <ReactPlayer url={url} controls onReady={_onReady}/>
            <form id="changeVideoForm" onSubmit={handleSubmit}>
                <Input type="text" placeholder="Enter a video link and watch with friends..." name="link" value={url} onChange={handleOnChange} defaultValue="https://"/>
            </form>
        </>

    )
}

export default VideoPlayer;