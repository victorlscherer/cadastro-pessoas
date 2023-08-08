import { io } from 'socket.io-client'

const socket = io("ws://localhost:8080")

socket.on('connect', () => {
})

export const sendWs = (cmd, data) => {
    socket.emit(cmd, data)
}

export const addRoute = (cmd, action) => {
    socket.on(cmd, action)
}