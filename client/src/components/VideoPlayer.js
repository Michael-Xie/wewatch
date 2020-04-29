import React from 'react';
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';

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
                <label for="video-link">Enter link: </label>
                <input type="text" name="video-link" id="video-link" required/>
                <button>Load</button>
            </form>


        </>

    )
}

export default VideoPlayer;