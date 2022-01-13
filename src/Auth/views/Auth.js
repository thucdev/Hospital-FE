import { useSelector } from 'react-redux'
import Login from '../Login'
import RegisterForm from '../RegisterForm'
import { authSelector } from '../../store/reducer/authSlice'
import './Auth.scss'

function Auth({ authRoute }) {
    // const login = useSelector(authSelector)
    // console.log('state', login)
    // const { authLoading, isAuthenticated } = login
    // console.log('', authLoading)
    let authLoading = false

    let body
    if (authLoading) {
        body = <div>loading</div>
    } else if (authRoute === 'login') {
        body = <Login />
    } else {
        body = (
            <div>
                <RegisterForm />
            </div>
        )
    }

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Learn it</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}
export default Auth
