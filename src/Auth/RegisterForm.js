import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../store/apiRequest/apiAuth"
import AlertMessage from "./AlertMessage"

const RegisterForm = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [alert, setAlert] = useState(null)

   const [registerForm, setRegisterForm] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   })
   const { email, password, confirmPassword } = registerForm

   const onChangeRegisterForm = (event) => {
      setRegisterForm({
         ...registerForm,
         [event.target.name]: event.target.value,
      })
   }
   const register = async (event) => {
      event.preventDefault()
      if (password !== confirmPassword) {
         setAlert({ type: "danger", message: `Password do not match!` })
         setTimeout(() => {
            setAlert(null)
         }, 3000)
         return
      }

      if (password.length < 6) {
         setAlert({ type: "danger", message: `Password have to be greater than 6 character!` })
         setTimeout(() => {
            setAlert(null)
         }, 3000)
         return
      }

      await registerUser(registerForm, dispatch)
      navigate("/login")
   }
   return (
      <>
         <AlertMessage info={alert} className='py-4 ' />
         <Form className='my-1' onSubmit={register}>
            <Form.Group>
               <Form.Control
                  type='email'
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
            <Button variant='success' type='submit' className='my-3'>
               Register
            </Button>
         </Form>
         <p>
            Already have an account?
            <Link to='/login'>
               <Button variant='info' size='sm' className='mx-2'>
                  Login
               </Button>
            </Link>
         </p>
      </>
   )
}

export default RegisterForm
