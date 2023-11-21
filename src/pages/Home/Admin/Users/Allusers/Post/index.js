import { Avatar, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import ClearIcon from '@mui/icons-material/Clear';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../../../../../firebase';

function Post({ amount, firstName, lastName, email, phone, profilePhoto, timestamp, regNo, faculty, country, ticketID, pos, receivedEmail, type, uid, number }) {
  const [firstNameUpdate, setFirstNameUpdate] = useState('')
  const [lastNameUpdate, setLastNameUpdate] = useState('')
  const [phoneUpdate, setPhoneUpdate] = useState('')
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  const openModal = (firstName, lastName, phone) => {
    setFirstNameUpdate(firstName)
    setLastNameUpdate(lastName)
    setPhoneUpdate(phone)
    setOpen(true)
  }

  const updateFun = () => {
    setLoading(true)
    db.collection('users').doc(uid).update({
      firstName: firstNameUpdate,
      lastName: lastNameUpdate,
      phone: phoneUpdate,
    })
    toast.success(`Member has been updated successfully!`, {
      position: "top-center",
      })
      setLoading(false)
  }

  const entryFun = () => {
    setLoading(true)
    db.collection('registration').doc(uid).update({
      checkedIn: true
    })
    toast.success(`Entry updated successfully for ${firstName} ${lastName}`, {
      position: "top-center",
      })
      setLoading(false)
  }

  const sendEmail = () => {
    setLoading(true)
    db.collection('registration').doc(uid).update({
      receivedEmail: true
    })
    sendViaEmail()
    toast.success(`Email has been sent to ${firstName} - Position: ${pos}`, {
      position: "top-center",
      })
      setLoading(false)
  }



  const sendViaEmail = async () => {
    const recipientEmail = email;
    var d = timestamp;
    //var d =val.timestamp;

    //NB: use + before variable name
    var date = new Date(+d);
    const cost = amount === 100 ? "Ordinary" : "VIP";
    const subject = encodeURIComponent(
      `Mr/Miss UoN 2023 Ticket Number: ${ticketID} - ${firstName} ${lastName}`
    );
    const body = encodeURIComponent(
      `Greetings ${firstName}, hope this mail finds you in good health. We've sent this mail to confirm to you that the registration for Mr/Miss UoN 2023 is a success. Below are the details for your booking.\n\nTicket Number: ${ticketID}\nList Position: ${pos}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nRegistration No.: ${regNo}\nPhone No.: ${phone}\nFaculty: ${faculty}\nCountry: ${country}\nAmount(KES): ${amount}.00\nType: ${cost}\nDate Registered: ${date.toDateString()}\n\nRegards,\nUwimana Jessy Bandya\nInternational Rep. Faculty Of Engineering.`
    );

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank");
  };

  return (
        <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell style={{fontWeight:'bold'}}> 
        {number}.         
        </TableCell>
        <TableCell align='right'>
        {firstName}                   
        </TableCell>
        <TableCell align='right'>
        {lastName}                   
        </TableCell>
        <TableCell align='right'>
        <a href={`tel: ${phone}`}>
        {phone}
        </a>                   
        </TableCell>
        <TableCell align='right'>
        <a href={`mailto: ${email}`}>
        {email}                  
        </a>
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
         <EditIcon onClick={() => openModal(firstName, lastName, phone)} style={{color:'#3498db', cursor: 'pointer'}}/>                
        </TableCell>

        <Dialog
        size="md"
        open={open}
        handler={() => setOpen(false)}
      >
      <Card className="mx-auto w-full">
      <CardBody className="flex flex-col gap-4">
      <ToastContainer />
        <Input
        value={firstNameUpdate}
        color='blue'
        onChange={(e) => setFirstNameUpdate(e.target.value)}
        label="First Name" size="lg" />

        <Input
        value={lastNameUpdate}
        color='blue'
        onChange={(e) => setLastNameUpdate(e.target.value)}
        label="Last Name" size="lg" />

        <Input
        value={phoneUpdate}
        color='blue'
        onChange={(e) => setPhoneUpdate(e.target.value)}
        label="Phone" size="lg" />
        <Button onClick={updateFun} color='blue' variant="gradient"  fullWidth>
        {loading ? 'Updating...' : 'Update'}
      </Button>
      </CardBody>
    </Card>
      </Dialog>
  </TableRow>
  )
}

export default Post