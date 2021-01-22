export const createPeerConnection = (stream?: MediaStreamTrack) => {
    let pc = new RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            }
        ]
    })
    if (stream) {
        pc.addTrack(stream)
    }

    pc.onicecandidate = (e) => {
        if (e.candidate) {
            console.log(e)
        } else {
            console.log("connect finished")
        }
    }

    pc.onaddstream = (e) => {
        console.log("ontrack", e)
    }
    return pc
}