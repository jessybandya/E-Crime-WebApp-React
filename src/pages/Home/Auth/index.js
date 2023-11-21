import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';

function Auth() {
  return (
    <div style={{paddingTop:70}} className="flex flex-col justify-center items-center h-full text-white">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl font-extrabold mb-4 p-6"
    >
      <center>
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-12 App-logo"
          alt="Jaby Logo"
          style={{height: 65}}
        />{" "}
      </center>
      E-Crime Web App
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-lg text-center"
    >
      <i>The Website is designed for Admin Management of the E-Crime App.</i>
      <center
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 8
        }}
      >
        <img
          src="https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png"
          style={{ height: 45 }}
          alt="ReactJS Logo"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
          style={{ height: 45 }}
          alt="JS Logo"
        />
        <img
          src="https://image.pngaaa.com/388/3920388-middle.png"
          style={{ height: 45 }}
          alt="Tailwind Css Logo"
        />
        <img
          src="https://w7.pngwing.com/pngs/761/513/png-transparent-material-ui-logo.png"
          style={{ height: 45 }}
          alt="MUI Logo"
        />
        <img
          src="https://img.stackshare.io/service/7374/react-redux.png"
          style={{ height: 45 }}
          alt="Persist Redux Logo"
        />
        <img
          src="https://e7.pngegg.com/pngimages/105/663/png-clipart-firebase-cloud-messaging-mobile-backend-as-a-service-software-developer-android-angle-text-thumbnail.png"
          style={{ height: 45 }}
          alt="Firebase Logo"
        />
        <img
          src="https://cdn-images-1.medium.com/max/710/0*Z-jwqyt2k8NbHaQe.png"
          style={{ height: 45 }}
          alt="Framer-Motion Logo"
        />
      </center>
      <center style={{marginTop:15}}>
          <Button className="mt-10" color="blue">Welcome Back!</Button>
      </center>
    </motion.p>
  </div>
  )
}

export default Auth