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
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../../../../../../firebase';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Detail from './Detail';
import Map from './Map';




function Post({ crimeId, title, description, category, fileType, fromId, timestamp, lat, long, media, number, status }) {
  const [completed, setCompleted] = useState('completed')
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openModalView, setOpenModalView] = React.useState(false);

  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);


  const updateFun = () => {
    setLoading(true)
    db.collection('crimes').doc(crimeId).update({
      status: completed,
    })
    toast.success(`Successfully Updated crime case status!`, {
      position: "top-center",
      })
      setLoading(false)
  }

  const deleteProduct = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      db.collection('crimes').doc(crimeId).delete()
      toast.success(`Successfully deleted crime case!`, {
        position: "top-center",
        })
    }
  }

  const entryFun = () => {
  //   setLoading(true)
  //   db.collection('registration').doc(uid).update({
  //     checkedIn: true
  //   })
  //   toast.success(`Entry updated successfully for ${firstName} ${lastName}`, {
  //     position: "top-center",
  //     })
  //     setLoading(false)
  }

  const sendEmail = () => {
  //   setLoading(true)
  //   db.collection('registration').doc(uid).update({
  //     receivedEmail: true
  //   })
  //   sendViaEmail()
  //   toast.success(`Email has been sent to ${firstName} - Position: ${pos}`, {
  //     position: "top-center",
  //     })
  //     setLoading(false)
  }





  return (
        <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell style={{fontWeight:'bold'}}> 
        {number}.         
        </TableCell>
        <TableCell align='right'>
        {title}                   
        </TableCell>
        <TableCell align='right'>
        {category}                   
        </TableCell>
        <TableCell align='right'>
            
          {status === 'pending' ? <span style={{color:'red'}}>{status}</span> : <span style={{color:'#3498db'}}>{status}</span>}                 
        </TableCell>
        <TableCell align='right'>
          <RemoveRedEyeIcon onClick={() => setOpenModalView(true)} style={{color:'#3498db', cursor: 'pointer'}}/>
        </TableCell>
        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
        <DeleteForeverIcon onClick={deleteProduct} style={{color:'#3498db', cursor: 'pointer', marginRight:5}}/>
         <EditIcon onClick={() => setOpen(true)} style={{color:'#3498db', cursor: 'pointer'}}/>                
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
        value={completed}
        color='blue'
        onChange={(e) => setCompleted(e.target.value)}
        label="First Name" size="lg" />

        <Button onClick={updateFun} color='blue' variant="gradient"  fullWidth>
        {loading ? 'Updating...' : 'Update'}
      </Button>
      </CardBody>
    </Card>
      </Dialog>


      <Dialog
      size="md"
      open={openModalView}
      handler={() => setOpenModalView(false)}
    >
    <Card className="mx-auto w-full">
    <CardBody className="flex flex-col gap-4">
    <Tabs id="custom-animation" value={0}>
    <TabsHeader>
    <Tab key={0} value={0}>
    Detail
   </Tab>
   <Tab key={1} value={1}>
   Location
   </Tab>
    </TabsHeader>
    <TabsBody
    animate={{
      initial: { y: 250 },
      mount: { y: 0 },
      unmount: { y: 250 },
    }}
    style={{background:'#fff', borderRadius:10}}
    >
    <TabPanel key={0} value={0}>
      <Detail ownerId={fromId} crimeId={crimeId} description={description} media={media} category={category} timestamp={timestamp} title={title} fileType={fileType}/>
    </TabPanel>
    <TabPanel key={1} value={1}>
    <Map  lat={lat} long={long} description={description} title={title}/>
   </TabPanel>
    </TabsBody>
    </Tabs>
    </CardBody>
  </Card>
    </Dialog>
  </TableRow>
  )
}

export default Post