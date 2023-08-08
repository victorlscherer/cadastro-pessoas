
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Typography, Row, Col, } from 'antd'
import { useEffect, useState } from "react";
import axios from "axios";
import { formateDate } from "../../Utils/utils";
import Chat from "../Chat/Chat";

const {Title, Link, Text} = Typography

const Home = () => {

    const Navigate = useNavigate()

    const [token, setToken] = useState(localStorage.getItem('token') || "");

    useEffect(() => {
        if (!token) {
            return Navigate("/login");
        }
    }, [token]);

    const [client, setClient] = useState({})

    useEffect(() => {
        if (token) {
            const { id } = jwt_decode(token);
            axios.get(`http://localhost:8080/client/${id}`)
                .then(res => {
                    setClient(res.data.client)
                    localStorage.setItem('user', JSON.stringify(res.data.client))
                    console.log(res.data.client);
                }
                ).catch(err => {
                    console.log(err);
                }
                );
        }
    }, []);


    return (
        <Row align='middle' justify='center' style={{height: '100%'}}>
            <div
                style={{
                    maxWidth: '600px',
                    width: '400px',
                    border: '1px solid #CDCECE',
                    borderRadius: '5px',
                    padding: '20px',
                    backgroundColor: '#ebebebd2',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Row>
                    <Col>
                        <Text>Olá, {client.fullname}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Seu email: {client.email}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>Sua data de nascimento: {formateDate(client.birthdate)}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Seu CEP: {client.CEP}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Seu estado: {client.state}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Sua cidade: {client.city}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Nome da sua rua: {client.streetName}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Número da sua casa: {client.houseNumber}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text>
                            Complemento da sua casa: {client.complement}
                        </Text>
                    </Col>
                </Row>
            </div>
        </Row>
    );
}

export default Home