import React from "react";
import { Alert, Button, Card, Typography } from "@material-tailwind/react";
 
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}


function CompleteResetAlert() {
  const [open, setOpen] = React.useState(true);

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
    <Card style={{width: 350 }}>
    <Alert
    open={open}
    className="max-w-screen-md"
    icon={<Icon />}
    color="blue"
  >
    <Typography variant="h5" color="white">
      Success
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
      <i>Successfully reset your password. You can now login to E-crime Mobile App.</i>
    </Typography>
  </Alert>
    </Card>
    </div>
</section>
</>
  )
}

export default CompleteResetAlert