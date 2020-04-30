import React, { useState, useEffect, useRef } from 'react';

export default ({ participant, username }) => {
  console.log("participant", participant)
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  console.log("videoTracks", videoTracks)
  console.log("audioTracks", audioTracks)

  const videoRef = useRef();
  const audioRef = useRef();
  console.log("videoRef", videoRef)
  console.log("audioRef", audioRef)

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);
  

  useEffect(() => {
    //remote participant track subscribed
    const trackSubscribed = (track) => {
      console.log("track", track)
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    console.log("videoTrack", videoTrack) //videoTrack.isEnabled
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  //remote participant track unsubscribed
  const trackUnsubscribed = (track) => {
    if (track.kind === 'video') {
      console.log("track", track)
      setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
    } else {
      setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
    }
  };
 
  
  return (
    <div className="participant">
      <h3>{username}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </div>
  );
}