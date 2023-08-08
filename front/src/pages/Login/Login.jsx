import { useState } from 'react'
import { Button, Checkbox, Form, Row, Col, Input, Typography, Divider  } from 'antd'
import { useNavigate } from 'react-router-dom'
import { submitLogin } from './loginUtils'
import { showNotify } from '../../Utils/utils'
import axios from 'axios'

const {Title, Link, Text} = Typography

const Login = () => {

    const Navigate = useNavigate()

    const onFinish = async (values) => {
        const response = await axios.post('http://localhost:8080/login/', {
            email: values.email,
            password: values.password
        }).then(res => {
            localStorage.setItem('token', res.data.token);
            Navigate('/');
        }).catch(err => {
            console.log(err);
            showNotify('error', `Erro ao realizar o login: ${err.data.message}`)
        }
        );
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        errorInfo.errorFields.map((erro) => {
            console.log("erro de submit: ", erro.errors)
        })
        showNotify('error', errorInfo.errorFields[0])
    }

    return (
        <Row align='middle' justify='center' style={{height: '100%'}}>
            <Col>
                <Form
                    name="formLogin"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: '600px',
                        width: '400px',
                        border: '1px solid #CDCECE',
                        borderRadius: '5px',
                        padding: '20px',
                        backgroundColor: '#ebebebd2',
                        boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Title
                        style={{
                            color: '#0086ff'
                        }}
                    >AM Store</Title>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Campo "Email" necessário!',
                            }
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Campo "Senha" necessário!',
                            },
                            {
                                min:8,
                                message: 'Mínimo de 8 caracteres!'
                            }
                        ]}
                        >
                        <Input.Password />
                    </Form.Item>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Button type="primary" style={{backgroundColor: '#0086ff', fontSize: '18px', height: '40px'}} htmlType="submit">
                            Entrar
                        </Button>

                        <Divider type="vertical" style={{
                            borderInlineStart: '4px solid #888484',
                            borderRadius: '5px',
                            height: '2.9em'
                        }}/>
                        <div>
                            <Text>Ainda não tem conta?</Text>
                            <Link style={{display: 'block', marginBottom: '10px'}} onClick={() => Navigate('/register')} >Criar conta</Link>
                        </div>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default Login