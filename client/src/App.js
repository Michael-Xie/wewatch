import React, {useEffect} from 'react';
import './App.css';
import VideoPlayer from "./components/VideoPlayer";
import axios from "axios";
const SyncClient = require('twilio-sync');

const SERVER_URL = "http://localhost:3001";
function App() {

  useEffect(()=>{
    axios.get(`${SERVER_URL}/token`)
    .then((tokenResponse) => {
      console.log("tokenResponse", tokenResponse);
      const syncClient = new SyncClient(tokenResponse.data.token, { logLevel: 'info' });
      syncClient.on('connectionStateChanged', function(state) {
        if (state !== 'connected') {
          console.log('Sync is not live (websocket connection <span style="color: red">' + state + '</span>)…');
        } else {
          console.log('Sync is live!');
        }
      })
    })
    .catch((err) => console.log(err));
  }, []);

  


  return (
    <div className="App">
      <VideoPlayer/>
    </div>
  );
}

export default App;
