import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Lobby from './Lobby';
import Room from './Room';

export default function VideoChat () {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    // const data = await fetch('/token', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     identity: username,
    //     room: roomName
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // // const data = await axios.get('/token')
    //   .then(res => res.json());
    //   console.log('data', data)
      // setToken(data.token);
      setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzRhNWYzNWQ4N2Y0YzY0M2E0MmVkYmNhMjc5NzdmZmYyLTE1ODgyMDcwNDgiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJUYXdkcnlJc2FhY0RhdmVucG9ydCIsInZpZGVvIjp7fSwiZGF0YV9zeW5jIjp7InNlcnZpY2Vfc2lkIjoiZGVmYXVsdCJ9fSwiaWF0IjoxNTg4MjA3MDQ4LCJleHAiOjE1ODgyMTA2NDgsImlzcyI6IlNLNGE1ZjM1ZDg3ZjRjNjQzYTQyZWRiY2EyNzk3N2ZmZjIiLCJzdWIiOiJBQzg4MWRhOTZjYzgzZWNkZjM5ZmEzOWVmNTgxYzU2MzE2In0.wHtrpFTk9zUFiZGyqZd-GvUSeoehB-W_hskNMBz_U4M")
    }, [username, roomName]);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} />
    );
  } else {
    render = (
      <Lobby
         username={username}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};