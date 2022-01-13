import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { registerUser } from '../store/apiRequest/apiAuth'
import { useDispatch } from 'react-redux'
// import AlertMessage from 'components/layout/AlertMessage'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const { email, password, confirmPassword } = registerForm

    const onChangeRegisterForm = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }
    const register = (event) => {
        event.preventDefault()
        registerUser(registerForm, dispatch, navigate)
    }
    return (
        <>
            <Form className='my-4' onSubmit={register}>
                {/* <AlertMessage info={alert} /> */}
                <Form.Group>
                    <Form.Control
                        type='text'
                        className='my-1'
                        placeholder='Username'
                        name='email'
                        required
                        value={email}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        className='my-1'
                        className='my-1'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        className='my-1'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm
