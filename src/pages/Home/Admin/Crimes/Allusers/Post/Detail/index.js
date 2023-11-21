import { Avatar } from '@mui/material'
import React from 'react'
import { db } from '../../../../../../../firebase'

function Detail({ ownerId, crimeId, description, media, category, timestamp, title, fileType }) {
  const [profileUser, setProfileUser] = React.useState([])

  React.useEffect(() => {

    db.collection('users').doc(ownerId).onSnapshot(snapshot => {
      setProfileUser(snapshot.data())
    })
  }, [ownerId])

  var t = new Date(timestamp);
  var hours = t.getHours();
  var minutes = t.getMinutes();
  var newformat = t.getHours() >= 12 ? 'PM' : 'AM';  
  
  // Find current hour in AM-PM Format 
  hours = hours % 12;  
  
  // To display "0" as "12" 
  hours = hours ? hours : 12;  
  minutes = minutes < 10 ? '0' + minutes : minutes; 
  var formatted = 
      (t.toString().split(' ')[0]) 
      + ', ' +('0' + t.getDate()).slice(-2) 
      + '/' + ('0' + (t.getMonth() + 1) ).slice(-2)
      + '/' + (t.getFullYear())
      + ' - ' + ('0' + t.getHours()).slice(-2)
      + ':' + ('0' + t.getMinutes()).slice(-2)
      + ' ' + newformat;

  return (
    <div>
    <div style={{display:'flex'}}>
        <div><Avatar src={profileUser?.profilePhoto} alt={profileUser?.firstName}/></div>
        <div style={{marginLeft:5}}>
            <div style={{fontSize:18,fontWeight:"bold",}}>{profileUser?.firstName} {profileUser?.lastName}</div>
            <div style={{color:"#666", fontSize:12}}>{formatted}</div>
        </div>
    </div>
    <center style={{fontWeight:'bold', color:'#3498db'}}><i>{title}</i></center>
    <hr />
      {description}
    <div>
      {fileType === 'image' ? <img src={media} alt='media' style={{width:'100%', height: 250, objectFit:'cover'}}/> : <video src={media} alt='media' style={{width:'100%', height:250}} controls/>}
    </div>
    </div>
  )
}

export default Detail