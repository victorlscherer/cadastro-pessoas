import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { sendWs, addRoute } from "../../Utils/webSocket";
import { Button, Form, Input, Layout, List, Row, Typography } from "antd";
import axios from "axios";
import { formatData } from "../../Utils/utils";

const {Header, Content, Sider } = Layout
const {Text, Title} = Typography
const {TextArea} = Input

const rooms = ["Marketing", "Vendas", "Suporte", "Financeiro", "RH", "TI", "Desenvolvimento"]

const Chat = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    useEffect(() => {
        if (!token) {
            return Navigate("/login");
        }
    }, [token]);

    const { id } = jwt_decode(token);

    const [userMesssage, setUserMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [selectedRoom, setSelectedRoom] = useState()

    useEffect(() => {
        if (selectedRoom) {
            setMessages([])
            sendWs("selectRoom", {room: selectedRoom, username: user.fullname })
            addRoute("selectRoom", (msg) => {
                setMessages(msg);
                console.log(msg);
            })
        }
    }, [selectedRoom])

    addRoute("message", (msg) => {
        setMessages([...messages, msg]);
        console.log(msg);
    })

    const sendMsg = () => {
        sendWs("message", {text: userMesssage, username: user.fullname, room: selectedRoom})
        setUserMessage("")
    }

    console.log(userMesssage);

    return (
        <Row align='middle' justify='center' style={{height: '100%'}}>
            <Layout style={{height: '100%', backgroundColor: 'rgb(28, 89, 143)'}}>
                <Sider style={{backgroundColor: 'rgb(128, 159, 185)'}}>
                    <List
                    size="small"
                    // bordered
                    dataSource={rooms}
                    renderItem={(item) => 
                        <List.Item>
                            <Button onClick={() => setSelectedRoom(item)}>{item}</Button>
                        </List.Item>
                    }
                    />
                </Sider>
                <Layout>
                    <Header style={{backgroundColor: 'rgb(128, 159, 185)'}}><Title style={{margin: 0}} level={2}>{selectedRoom}</Title></Header>
                    <Content>
                        <Row justify='left' align='bottom' style={{height: '80%', width: '100%'}}>
                            <List
                            sttyle={{
                                width: '100%',
                                height: '100%',
                                overflow: 'auto',
                                backgroundColor: 'white',
                                padding: '10px',
                                borderRadius: '5px',
                                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end'
                            }}
                            size="small"
                            // bordered
                            dataSource={messages}
                            renderItem={(item) => 
                                <List.Item key={item.text}>
                                    <Text>{item.username} - {formatData(item.createdAt)} - {item.text}</Text>
                                </List.Item>
                            }
                            />
                        </Row>
                            <Form onFinish={sendMsg}>
                        <Row justify='space-between' align='middle' style={{height: '10%'}}>
                                <TextArea onChange={(e) => setUserMessage(e.target.value)} value={userMesssage} rows={3}/>
                                <Button type='primary' onClick={sendMsg}>Enviar</Button>
                        </Row>
                            </Form>
                    </Content>
                </Layout>
            </Layout>
        </Row>
    )
}

export default Chat