import { useState } from 'react'
import { Button, Checkbox, Form, Row, Col, Input, Typography, Divider, DatePicker  } from 'antd'
import { useNavigate } from 'react-router-dom'
import { showNotify } from '../../Utils/utils'
import { getCep } from './registerUtils'
import { formItem } from './style'
import axios from 'axios'

const {Title, Link, Text} = Typography

const Register = () => {

    const Navigate = useNavigate()

    const [form] = Form.useForm()

    const [registerData, setRegisterData] = useState({})

    const onFinish = (values) => {
        const dateBirth = new Date(values.birthdate)
        values.birthdate = dateBirth
        delete values.repassword
        
        axios.post('http://localhost:8080/registration/', values)
            .then(res => {
                console.log(res)
                Navigate('/login')
            }
            ).catch(err => {
                console.log(err)
                showNotify('error', 'Erro ao criar usuário')
            }
            )
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        errorInfo.errorFields.map((erro) => {
            console.log("erro de submit: ", erro.errors)
        })
        showNotify('error', errorInfo.errorFields[0])
    }

    const getAdress = async (cep) => {
        const adressData = await getCep(cep)
        console.log(adressData);
        if(adressData){
            form.setFieldValue('streetName', adressData.logradouro)
            form.setFieldValue('state', adressData.uf)
            form.setFieldValue('city', adressData.localidade)
            form.setFieldValue('neighborhood', adressData.bairro)
        }
    }

    return (
        <Row align='middle' justify='center' style={{height: '100%'}}>
            <Col>
                <Form
                    id='formRegister'
                    name="formRegister"
                    form={form}
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 17,
                    }}
                    style={{
                        maxWidth: '600px',
                        width: '600px',
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
                            color: '#0086ff',
                            margin: '20px'
                        }}
                    >AM Store</Title>
                    <Form.Item
                        label="Nome Completo"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Campo "Nome Completo" necessário!',
                            },
                            {
                                max: 150,
                                message: 'Máximo de 150 caracteres!'
                            }
                        ]}
                        style={formItem}
                        >
                        <Input maxLength={150} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Campo "Email" necessário!',
                            }
                        ]}
                        style={formItem}
                        >
                        <Input maxLength={150} />
                    </Form.Item>
                    <Form.Item
                        label="Data de Nascimento"
                        name="birthdate"
                        rules={[
                            {
                                required: true,
                                message: 'Campo "Data de Nascimento" necessário!',
                            }
                        ]}
                        style={formItem}
                        >
                        <DatePicker placeholder='Selecione a data' format={"DD/MM/YYYY"} />
                    </Form.Item>
                    <Form.Item
                        label="CPF"
                        name="cpf"
                        rules={[
                            {
                                required: true,
                                message: 'Campo "CPF" necessário!',
                            }
                        ]}
                        style={formItem}
                        >
                        <Input maxLength={11} />
                    </Form.Item>
                    <Form.Item
                        label="CEP"
                        name="CEP"
                        rules={[
                            {
                                required: true,
                                message: 'Campo "CEP" necessário!',
                            }
                        ]}
                        style={formItem}
                        >
                        
                        <Input maxLength={8}  onBlur={(e) => getAdress(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        dependencies={['cep']}
                        label="Rua"
                        name="streetName"
                        rules={[
                            {
                            required: true,
                            message: 'Campo "Rua" necessário!',
                            }
                        ]}
                        style={formItem}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        dependencies={['cep']}
                        label="Número"
                        name="houseNumber"
                        rules={[
                            {
                            required: true,
                            message: 'Campo "Número" necessário!',
                            }
                        ]}
                        style={formItem}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        dependencies={['cep']}
                        label="Cidade"
                        name="city"
                        rules={[
                            {
                            required: true,
                            message: 'Campo "Cidade" necessário!',
                            }
                        ]}
                        style={formItem}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        dependencies={['cep']}
                        label="Estado"
                        name="state"
                        rules={[
                            {
                            required: true,
                            message: 'Campo "Estado" necessário!',
                            }
                        ]}
                        style={formItem}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        dependencies={['cep']}
                        label="Bairro"
                        name="neighborhood"
                        rules={[
                            {
                            required: true,
                            message: 'Campo "Bairro" necessário!',
                            }
                        ]}
                        style={formItem}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Complemento"
                        name="complement"
                        style={formItem}
                    >
                        <Input/>
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
                        style={formItem}
                        >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Confirme a senha"
                        name="repassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: 'Por favor, confirme a senha!',
                            },
            
                            ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                                }
                                return Promise.reject(new Error('As senhas estão diferentes!'));
                            },
                            }),
                        ]}
                        style={formItem}
                        >
                        <Input.Password />
                    </Form.Item>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Button type="primary" style={{backgroundColor: '#0086ff', fontSize: '18px', height: '40px'}} htmlType="submit">
                            Cadastrar
                        </Button>

                        <Divider type="vertical" style={{
                            borderInlineStart: '4px solid #888484',
                            borderRadius: '5px',
                            height: '2.9em'
                        }}/>
                        <div>
                            <Text>Já tem conta?</Text>
                            <Link style={{display: 'block', marginBottom: '10px'}} onClick={() => Navigate('/register')} >Fazer login</Link>
                        </div>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default Register