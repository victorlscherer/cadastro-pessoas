import './App.css'
import { ToastContainer } from 'react-toastify';
import Router from './routes'

import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const {Header, Content} = Layout
const {Text, Title} = Typography

function App() {

  const Navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || "")

  return (
    <Layout id='layout'>
      <Header style={{
          backgroundColor: '#ebebebd2'
      }}>
        <Row justify={'space-between'} align={'middle'} >
          <Col>
              <Text>Olá {user.fullname}</Text>
          </Col>
          <Col >
            <Title style={{margin: 0}} level={2}>
              AM Store
            </Title>
          </Col>
          <Col>
            <Button onClick={() => {Navigate('/')}} style={{marginRight: '5px'}}>Informações</Button>
            <Button onClick={() => {Navigate('/chat')}} >Chat</Button>
          </Col>
        </Row>
      </Header>
      <Content>
        <Router/>
      </Content>
      <ToastContainer/>
    </Layout>
  )
}

export default App
