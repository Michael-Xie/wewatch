import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';

export default ({ username, roomName, token, handleLeaveRoom}) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));
  console.log("remoteParticipants", remoteParticipants)

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    //connects to the Twilio Video service
    Video.connect(token, { name: roomName })
      .then(room => { 
        console.log("ROOM", room)
        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);
    });
    //disconnects local participant and stop tracks when leave room
    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(trackPublication =>
            trackPublication.track.stop());
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  return (
        <div className="room">
          <h2>Room: {roomName}</h2>
          <button onClick={handleLeaveRoom}>Leave Room</button>
            <div className="local-participant">
              {room ? (
                <Participant key={room.localParticipant.sid} participant={room.localParticipant} username={username} />
              ) : (
                ''
              )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
  );
};
