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
import { Backdrop, CircularProgress } from '@mui/material'
import { auth, db } from '../../firebase'
import { updateAuthId } from '../../redux/dataSlice'

function CompleteRegistration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
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

    const login = async() =>{
        setOpen(true)
        if(!firstName){
          toast.error('First name is required!',{
              position: "top-center",
          })
          setOpen(false)
      }else if(!lastName){
        toast.error('Last name is required!',{
            position: "top-center",
        })
        setOpen(false)
       }else if(!email){
        toast.error('Email is required!',{
            position: "top-center",
        })
        setOpen(false)
       }else if(!phone){
        toast.error('Phone number is required!',{
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

        try{
          const result = await auth.signInWithEmailLink(
              email, 
              window.location.href
              );
          
          if(result.user.emailVerified){
              let user = auth.currentUser
              await user.updatePassword(password);    
              await db.collection('users').doc(user.uid).set({
                  uid: user.uid,
                  firstName,
                  lastName,
                  phone,
                  email,
                  profilePhoto: "https://avatars.githubusercontent.com/u/69303168?v=4",
                  timestamp: Date.now()
                });  
                setOpen(false);
                auth.signOut();
                history('/complete-registration-alert');
          }
          
          }catch(error){
            setOpen(false)
          //
          toast.error(error.message)
      }

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
    <Card style={{width: 350, marginTop:30}}>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
        style={{height: 100}}
      >
        <Typography variant="h3" color="white">
          Registration
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
      <Input 
      color="blue"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      label="First Name"
      size="lg"
      />
      <Input 
      color="blue"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      label="Last Name"
      size="lg"
      />
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
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        label="Phone Number"
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
  Registering...<CircularProgress color="inherit" />
</Backdrop>
</section>
</>
  )
}

export default CompleteRegistration