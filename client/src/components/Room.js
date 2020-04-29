import React, { useState, useEffect } from 'react';
import { Drawer } from '@material-ui/core';
import Video from 'twilio-video';

const Room = ({ roomName, token }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const remoteParticipants = participants.map(participant => (
    <p key={participant.sid}>participant.identity</p>
  ));

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });
  });

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <Drawer
        // className={classes.drawer}
        variant="permanent"
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
        anchor="right"
       >
        <div className="local-participant">
          {room ? (
            <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p>
          ) : (
            ''
          )}
        </div>
        <h3>Remote Participants</h3>
        <div className="remote-participants">{remoteParticipants}</div>
      </Drawer>
    </div>
  );

};

export default Room;