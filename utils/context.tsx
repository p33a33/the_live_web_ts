import { createContext } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:8000")
const socketContext = createContext(socket)

export { socketContext, socket }