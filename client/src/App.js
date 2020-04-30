import React, {useEffect, useState} from 'react';
import './App.css';
import VideoPlayer from "./components/VideoPlayer";
import axios from "axios";
const twilioSync = require('twilio-sync');

const SERVER_URL = "http://localhost:3001";
function App() {
  const [sync, setSync] = useState("");
  
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

  console.log('sync app', sync)

  return (
    <div className="App">
      <VideoPlayer twilioSync={sync}/>
    </div>
  );
}

export default App;
