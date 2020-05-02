import React, {useEffect, useState} from 'react';
import './App.css';

import {useVideoPlayerSync} from "../src/hooks/useVideoPlayerSync";
import VideoPlayerSync from "./components/VideoPlayerSync";

import VideoRoom from './components/VideoRoom';

import axios from "axios";
const twilioSync = require('twilio-sync');



const SERVER_URL = "http://localhost:3001";

function App() {
  const initVideoState = {
    url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    playing: false,
  };
  const [videoState, setVideoState] = useState(initVideoState);
  const [sync, setSync] = useState("");
  const {updateVideoState, syncVideo} = useVideoPlayerSync(videoState, setVideoState, sync);

  useEffect(()=>{
    axios.get(`${SERVER_URL}/token`)
    .then((tokenResponse) => {
      console.log("tokenResponse", tokenResponse);
      const syncClient = new twilioSync(tokenResponse.data.token, { logLevel: 'info' });
      syncClient.on('connectionStateChanged', function(state) {
        if (state !== 'connected') {
          console.log('Sync is not live (websocket connection <span style="color: red">' + state + '</span>)…');
        } else {
          console.log('Sync is live!');
          setSync(syncClient);
         
        }
      })
    })
    .catch((err) => console.log(err));
  }, []);
  // initialize sync doc for video state and video time
  useEffect(()=> {
    if (sync) {
      updateVideoState(initVideoState);
      // sync.document("videoState")
      // .then((syncDoc) => {
      //   syncDoc.set(initVideoState);
      // })
      syncVideo({playedSeconds: 0});
      // sync.document("videoTime")
      // .then((syncDoc) => {
      //   syncDoc.set({playedSeconds: 0})
      // })
    }
  }, [sync]);

  // get video state changes from other client(s)
  // useEffect(() => {
  //     if (sync) {
  //         sync.document("videoState")
  //         .then((syncDoc) => {
  //           syncDoc.on("updated", (event) => {
  //               // console.log("Updated", event.isLocal? "locally." : "by the other guy.");
  //               setVideoState((prev) => ({...prev, ...event.value}));
  //               console.log("updated sync value", event.value, videoState);
  //             })
  //         })
  //     }
  // });

  // useEffect(() => {
  //   if (sync) {
  //       sync.document("videoTime")
  //       .then((syncDoc) => {
  //         syncDoc.on("updated", (event) => {
  //           setVideoState((prev) => ({...prev, ...event.value}));
  //           console.log("updated video time value", event.value, videoState);
  //         })
  //       })
  //   }
  // });

  return (
    <div className="App">



      <header>
        <h1>Together WeWatch</h1>
      </header>

        <VideoRoom />
        <VideoPlayerSync 
        videoState={videoState} 
        updateVideoState={updateVideoState}
        syncVideo={syncVideo}
      />
      <footer>
        <p>April 2020</p>
      </footer>
    </div>
  );
}

export default App;
