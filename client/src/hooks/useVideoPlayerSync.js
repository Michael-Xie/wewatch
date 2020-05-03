export const useVideoPlayerSync = function(videoState, setVideoState, twilioSync) {
    const updateVideoState = (curr) => {
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
                    // console.log("updated video time value", event.value, videoState);
                })
            })
        }
    }
    return {updateVideoState, syncVideo}
}