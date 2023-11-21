import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth } from '../../firebase'
import { Backdrop, CircularProgress } from '@mui/material'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);




    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if(user){
          const idTokenResult = await user.getIdTokenResult()
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token,
              
            }
          })
          dispatch(updateAuthId(`${user?.uid}`))
  
        }
      })
      return () => unsubscribe()
    }, [])

    const login = () =>{
        setOpen(true)
       if(!email){
        toast.error('Email is required!',{
            position: "top-center",
        })
        setOpen(false)
       }else if(!password){
        toast.error('Password is required!',{
            position: "top-center",
        })
        setOpen(false)
    }else{
        setOpen(true)
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>{
            setOpen(false)
            history('/')
          Swal.fire({
            icon: 'success',
            title: 'Logged in successfully!',
            text: 'Welcome Back!',            
          })
        })
        .catch((e) =>{
                toast.error('Invalid Email or Password!', {
                  position: toast.POSITION.TOP_CENTER
              })      
              setOpen(false)     
        })
    }
    }



  return (
    <>
    <section
    className="bg-cover bg-center h-screen"
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('https://androidkenya.com/wp-content/uploads/2023/02/safaricom_m-pesa_banner.jpg')",
    }}
    >
    <div className="flex flex-col justify-center items-center h-full text-white">
    <Card style={{width: 350}}>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
        style={{height: 100}}
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input 
        color="blue"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        label="Email"
        size="lg"
        />
        <Input 
        color="blue"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label="Password"
        size="lg"
         />
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={login} color='blue' variant="gradient" fullWidth>
          Sign In
        </Button>
      </CardFooter>
    </Card>
    </div>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
  Signing in...<CircularProgress color="inherit" />
</Backdrop>
</section>
</>
  )
}

export default Login