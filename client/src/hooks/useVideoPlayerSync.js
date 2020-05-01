export const useVideoPlayerSync = function(videoState, setVideoState, twilioSync) {
    const updateVideoState = (curr) => {
        setVideoState((prev) => {
            return {...prev, 
                ...curr
            }
        });
        if (twilioSync) {
            twilioSync.document("videoState")
            .then((syncDoc) => {
                syncDoc.update({...curr})
            })
        }
    }

    const syncVideo = (playedSeconds) => {
        if (twilioSync) {
            twilioSync.document("videoTime")
            .then((syncDoc) => {
                syncDoc.update({playedSeconds: playedSeconds})
            })
        }
    }
    return {updateVideoState, syncVideo}
}