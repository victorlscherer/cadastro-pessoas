import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Chat from '../pages/Chat/Chat'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/chat' element={<Chat/>} />
        </Routes>
    )
}

export default Router