import { socket } from "./context"

const actions = {
    joinRoom: (room: string) => {
        socket.emit("join", { room: room })
    },

    leaveRoom: (room: string) => {
        socket.emit("leave", { room: room })
    },

    sendOffer: (offer: RTCSessionDescriptionInit) => {
        socket.emit("offer", offer)
    },

    sendAnswer: (answer: RTCSessionDescriptionInit) => {
        socket.emit("answer", answer)
    }
}

const listening = {
    joined: () => socket.on("joined", (message: string) => {
        console.log(message)
    }),

    left: () => socket.on("left", (message: string) => {
        console.log(message)
    }),

    recieveOffer: () =>
        socket.on("offer", (offer: RTCSessionDescriptionInit) => {
            console.log(offer)
            return offer
        }),

    recieveAnswer: () =>
        socket.on("answer", (answer: RTCSessionDescriptionInit) => answer)
}

export { actions, listening }