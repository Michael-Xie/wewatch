import React from 'react';
import './App.css';
import VideoChat from './components/VideoChat';
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return(
      <div className="App">
        <VideoChat />
        <VideoPlayer/>
      </div>
  );
}

export default App;
