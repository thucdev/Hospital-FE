import { useState } from "react"
import { Spinner } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginAsync } from "../store/apiRequest/apiAuth"
import AlertMessage from "./AlertMessage"

const Login = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [alert, setAlert] = useState(null)
   const [loading, setLoading] = useState(false)

   const [loginForm, setLoginForm] = useState({
      email: "",
      password: "",
   })
   const { email, password } = loginForm
   const onChangeLoginForm = (event) => {
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
   }

   const login = async (event) => {
      event.preventDefault()
      setLoading(true)

      const loginData = await loginAsync(loginForm, dispatch, navigate)

      if (loginData?.success) {
         setLoading(false)

         navigate("/system")
      } else {
         setAlert({ type: "danger", message: loginData?.message })
         setTimeout(() => {
            setAlert(null)
         }, 3000)
      }
   }

   return (
      <>
         {loading === true && (
            <div className='d-flex justify-content-center mt-2'>
               <Spinner animation='border' variant='info' />
            </div>
         )}
         {loading === false && (
            <>
               <Form className='my-2' onSubmit={login}>
                  <AlertMessage info={alert} />
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
                  <Button variant='success' type='submit' className='my-1'>
                     Log In
                  </Button>
               </Form>
               <p className='mx-2 mt-2'>
                  Don't have an account?
                  <Link to='/register'>
                     <Button variant='info' size='sm' className='mx-2 '>
                        Register
                     </Button>
                  </Link>
               </p>
            </>
         )}
      </>
   )
}

export default Login
