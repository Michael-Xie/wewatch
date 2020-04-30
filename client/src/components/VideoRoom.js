import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Lobby from './Lobby';
import Room from './Room';

export default function VideoRoom () {
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
    const data = await axios.get('http://localhost:3001/token')
      .then(res => res.data)
      setToken(data.token);
    }, [username, roomName]);

    const handleLeaveRoom = useCallback(event => {
      setToken(null);
    }, []);

  return (
    <div>
      {token ? (
        <Room roomName={roomName} token={token} username={username} handleLeaveRoom={handleLeaveRoom} />
      ) : (
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};