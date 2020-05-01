export const useVideoPlayerSync = function(videoState, setVideoState, twilioSync) {
    const updateVideoState = (url, playing) => {
        setVideoState((prev) => {
            return {...prev, 
                url: url,
                playing: playing,
            }
        });
        if (twilioSync) {
            twilioSync.document("videoState")
            .then((syncDoc) => {
                syncDoc.update({url: url, playing: playing})
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