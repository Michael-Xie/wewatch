export const useVideoPlayerSync = function(videoState, setVideoState, twilioSync) {
    const updateVideoState = (curr) => {
        // console.log("curr", curr)
        // setVideoState((prev) => {
        //     return {...prev, 
        //         ...curr
        //     }
        // });
        if (twilioSync) {
            twilioSync.document("videoState")
            .then((syncDoc) => {
                console.log("updating video state ...")
                syncDoc.update({...curr})
                syncDoc.on("updated", (event) => {
                // console.log("Updated", event.isLocal? "locally." : "by the other guy.");
                setVideoState((prev) => ({...prev, ...event.value}));
                // console.log("updated sync value", event.value, videoState);
              })
            })
            
        }
    }

    const syncVideo = (playedSeconds, player=null) => {
        if (twilioSync) {
            twilioSync.document("videoTime")
            .then((syncDoc) => {
                console.log("updating video time ...")
                syncDoc.update({playedSeconds: playedSeconds})
                syncDoc.on("updated", (event) => {
                    setVideoState((prev) => ({...prev, ...event.value}));
                    console.log("updated video time value", event.value, videoState);
                    // if (player) {
                    //     console.log("player exists...");
                    //     if (Math.abs(playedSeconds - event.value) > 0) {
                    //         console.log("seeking to", event.value);
                    //         player.current.seekTo(event.value, "seconds");
                    //     }
                    // }
                })
            })
        }
    }
    return {updateVideoState, syncVideo}
}

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