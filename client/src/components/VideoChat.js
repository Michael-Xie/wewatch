import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';

export default function VideoChat () {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  console.log(token)

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    const data = await fetch('/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.token);
  }, [username, roomName]);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} />
      // <div>
      //   <p>Username: {username}</p>
      //   <p>Room name: {roomName}</p>
      //   <p>Token: {token}</p>
      // </div>
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






// import React, {useCallback} from 'react';
// import Participant from './Participant';
// import { styled } from '@material-ui/core/styles';
// import Video, { ConnectOptions } from 'twilio-video';

// console.log(ConnectOptions)

// const Container = styled('div')(({ theme }) => ({
//   position: 'relative',
//   height: '100%',
//   display: 'grid',
//   gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
//   gridTemplateAreas: '". participantList"',
//   [theme.breakpoints.down('xs')]: {
//     gridTemplateAreas: '"participantList" "."',
//     gridTemplateColumns: `auto`,
//     gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
//     gridGap: '6px',
//   },
// }));


// export default function Room() {
//   Video.connect()
//   return (
//     <Container>
//       <Participant />
//     </Container>
//   );
// }

// const connect = useCallback(
//   token => {
//     setIsConnecting(true);
//     return Video.connect(token, { ...options, tracks: [] }).then(
//       newRoom => {
//         setRoom(newRoom);
//         const disconnect = () => newRoom.disconnect();

//         newRoom.once('disconnected', () => {
//           // Reset the room only after all other `disconnected` listeners have been called.
//           setTimeout(() => setRoom(new EventEmitter() as Room));
//           window.removeEventListener('beforeunload', disconnect);

//           if (isMobile) {
//             window.removeEventListener('pagehide', disconnect);
//           }
//         });

//         // @ts-ignore
//         window.twilioRoom = newRoom;

//         localTracksRef.current.forEach(track =>
//           // Tracks can be supplied as arguments to the Video.connect() function and they will automatically be published.
//           // However, tracks must be published manually in order to set the priority on them.
//           // All video tracks are published with 'low' priority. This works because the video
//           // track that is displayed in the 'MainParticipant' component will have it's priority
//           // set to 'high' via track.setPriority()
//           newRoom.localParticipant.publishTrack(track, { priority: track.kind === 'video' ? 'low' : 'standard' })
//         );

//         setIsConnecting(false);

//         // Add a listener to disconnect from the room when a user closes their browser
//         window.addEventListener('beforeunload', disconnect);

//         if (isMobile) {
//           // Add a listener to disconnect from the room when a mobile user closes their browser
//           window.addEventListener('pagehide', disconnect);
//         }
//       },
//       error => {
//         onError(error);
//         setIsConnecting(false);
//       }
//     );
//   },
//   [options, onError]
// );