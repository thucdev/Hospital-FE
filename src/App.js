import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import Login from './Auth/Login'
import Auth from './Auth/views/Auth'
import Homepage from './components/Hompage/Homepage'
import './App.scss'

function App() {
    return (
        // <Routers>
        <Routes>
            <Route path='/register' element={<Auth authRoute='register' />} />
            <Route path='/login' element={<Auth authRoute='login' />} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/' element={<Login />} />
        </Routes>
        // </Routers>
    )
}

export default App
