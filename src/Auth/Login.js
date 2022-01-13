import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
// import AlertMessage from 'components/layout/AlertMessage'
import { useDispatch } from 'react-redux'
import { loginAsync } from '../store/apiRequest/apiAuth'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const { email, password } = loginForm
    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const login = (event) => {
        event.preventDefault()
        // dispatch(loginAsync(loginForm))
        loginAsync(loginForm, dispatch, navigate)
    }

    return (
        <>
            <Form className='my-4' onSubmit={login}>
                {/* <AlertMessage info={alert} /> */}
                <Form.Group>
                    <Form.Control
                        type='text'
                        className='my-1'
                        placeholder='Username'
                        name='email'
                        required
                        value={email}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        className='my-1'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default Login
