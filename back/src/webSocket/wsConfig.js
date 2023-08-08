import { Server } from 'socket.io'

const commands = {}
let users = []
let messages = []
let io

export const startWs = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        socket.on('authentication', (data) => { authentication(socket, data) })

        socket.on("selectRoom", (data) => {

            socket.join(data.room);
            const userInRoom = users.find((user) => user.username === data.username && user.room === data.room);

            if (userInRoom) {
                userInRoom.socket_id = socket.id;
            } else {
                users.push({
                    room: data.room,
                    username: data.username,
                    socket_id: socket.id
                })
            }

            const roomMessages = messages.filter((message) => message.room === data.room);
            console.log(roomMessages);
            socket.emit("selectRoom", roomMessages);
        })

        socket.on("message", (data) => {
            console.log(data);
            const message = {
                room: data.room,
                username: data.username,
                text: data.text,
                createdAt: new Date()
            }

            messages.push(message);

            io.to(data.room).emit("message", message);

            console.log(messages);
        })

        socket.on("disconnect", () => {
            users = users.filter((user) => user.socket_id !== socket.id);
        })

        socket.on('error', onError)
    })
}

const onError = (err) => {
    console.log(`onError: ${err.message}`)
}

export const sendWs = (cmd, data, id) => {
    if (id) {
        io.to(id).emit(cmd, data)
    } else {
        io.emit(cmd, data)
    }
}

const authentication = (socket, data) => {
    console.log("authenticou", socket, data);
    let { id } = data

    if (!id) {
        id = createWsId()
        socket.emit('connect', { id })
    }

    socket.id = id
    socket.join(id)
}

export const addCommand = (cmd, action) => {
    console.log("add comand", cmd, action);
    commands[cmd] = action
}

const createWsId = () => {
    const randomDate = new Date().getTime()
    return `#${randomDate}`
}