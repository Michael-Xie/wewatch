import React, {useState, useEffect} from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import { Button, Input } from '@material-ui/core';

const VideoPlayer = function({twilioSync, initVideoState}) {
    // currentVideo={videoStates[channel].url}
    // changeVideoState={changeVideoState}
    // paused={videoStates[channel] ? videoStates[channel].paused : false}
    // played={videoStates[channel] ? videoStates[channel].played : true}
    // timeStamp={videoStates[channel] ? videoStates[channel].timeStamp : 0}
    // channel={channel}
    // syncVideo={syncVideo}
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=ysz5S6PUM-U');
    // const initVideoState = async function(twilioSync) {
    //     if (twilioSync) {
    //         const syncDoc = await twilioSync.document("videoState");
    //         console.log("initialized", syncDoc.value);
    //         return syncDoc.value;
    //     }
    // }

    const [videoState, setVideoState] = useState(initVideoState);

    // 'https://www.youtube.com/watch?v=ysz5S6PUM-U'

    useEffect(() => {
        if (twilioSync) {
            twilioSync.document("videoState")
            .then((syncDoc) => {
                syncDoc.on("updated", (event) => {
                    console.log("Updated", event.isLocal? "locally." : "by the other guy.");
                    console.log("updated sync value", event.value);
                    setVideoState(event.value);
                })

            })
        }
    });

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
        // twilioSync.document('videoState')
        // .then((syncDoc) => {
        //     syncDoc.set(videoState);
        //     console.log(videoState)
        // });
    }
    
    const onPlay = function(event) {
        console.log("playing...");
        // setVideoState((prev) => {
        //     return {...prev,
        //     playing: true}
        // });
        twilioSync.document('videoState')
        .then((syncDoc) => {
            syncDoc.update({playing: true});
            console.log(videoState)
        });
    }
    const onPause = function(event) {
        console.log("pausing...");
        // setVideoState((prev) => {
        //     return {...prev,
        //     playing: false}
        // });
        twilioSync.document('videoState')
        .then((syncDoc) => {
            syncDoc.update({playing: false});
            console.log(videoState)
        });
    }

    const handleOnChange = (e) => {
        console.log(e.target.value);
        setUrl(e.target.value);
    };
    
    const onProgress = (e) => {
        console.log("progress", e);
    };    

    return (
        <>
            <ReactPlayer url={url} controls playing={videoState.playing} onReady={_onReady} onPlay={onPlay} onPause={onPause} onProgress={onProgress}/>
            <form id="changeVideoForm" onSubmit={(e) => e.preventDefault()}>
                <Input type="text" placeholder="Enter a video link and watch with friends..." name="link" value={url} onChange={handleOnChange} defaultValue="https://"/>
            </form>
        </>

    )
}

export default VideoPlayer;