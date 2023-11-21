import React from "react";
import { useSelector } from "react-redux";
import Admin from "./Admin";
import Auth from "./Auth";

function Home() {
    const authId = useSelector((state) => state.authId);
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('https://androidkenya.com/wp-content/uploads/2023/02/safaricom_m-pesa_banner.jpg')",
      }}
    >
    <div
    style={{paddingTop:60}}
    >
    {authId === 'AfK1k3Y0ShdxlgTxE39xlCa3Nbu1' ? (
        <Admin />
    ): !authId ?(
        <Auth />
    ):(
        <Auth />    
    )}
    </div>
    </div>
  );
}

export default Home;
