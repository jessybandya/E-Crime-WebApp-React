import React from 'react'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react'
import TotalCard from '../../../components/TotalCard';
import { db } from '../../../firebase';
import Users from './Users';
import Crimes from './Crimes';

function Admin() {
  const [users, setUses] = React.useState([])
  const [crimes, setCrimes] = React.useState([])
  const [pendingCrimes, setPendingCrimes] = React.useState([])
  const [completedCrimes, setCompletedCrimes] = React.useState([])

  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setUses(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('crimes').onSnapshot((snapshot) => {
      setCrimes(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('crimes').where('status', '==', 'pending').onSnapshot((snapshot) => {
      setPendingCrimes(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('crimes').where('status', '==', 'completed').onSnapshot((snapshot) => {
      setCompletedCrimes(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  return (
    <Card className='home'>
    <div className='cards'>
    <TotalCard title='Total Users' number={users?.length} icon={SupervisedUserCircleIcon} />
    <TotalCard title='Total Crime Cases' number={crimes?.length} icon={SupervisedUserCircleIcon} />
    <TotalCard title='Pending Crime Cases' number={pendingCrimes?.length} icon={SupervisedUserCircleIcon} />
    <TotalCard title='Completed Crime Cases' number={completedCrimes?.length} icon={SupervisedUserCircleIcon} />
 </div>


 <div>
 <Tabs style={{marginTop:15}} id="custom-animation" value={0}>
 <TabsHeader>
 <Tab key={0} value={0}>
 Users
</Tab>
<Tab key={1} value={1}>
Crime Cases
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
   <Users />
 </TabPanel>
 <TabPanel key={1} value={1}>
 <Crimes />
</TabPanel>
 </TabsBody>
 </Tabs>
 </div>
    </Card>
  )
}

export default Admin